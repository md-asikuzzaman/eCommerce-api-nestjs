import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { formatMoney } from 'src/common/utils/format-money';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      orders: orders.map((order) => ({
        ...order,
        totalAmount: formatMoney(order.totalAmount.toString()),
        items: order.items.map((item) => ({
          ...item,
          price: formatMoney(item.price.toString()),
          product: {
            ...item.product,
            price: formatMoney(item.product.price.toString()),
          },
        })),
      })),
    };
  }

  async createOrder(userId: string) {
    // 1. Fetch cart with items and products
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // 2. Cart not found / empty
    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // 3. Check stock
    for (const item of cart.items) {
      if (item.product.quantity < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for ${item.product.name}`,
        );
      }

      if (!item.product.isActive) {
        throw new BadRequestException(
          `Product ${item.product.name} is not available`,
        );
      }
    }

    // 4. Calculate total
    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const order = await this.prisma.$transaction(async (tx) => {
      // create order
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalAmount,
        },
      });

      // Create order items
      await tx.orderItem.createMany({
        data: cart.items.map((item) => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      });

      // Decrease product stock
      for (const item of cart.items) {
        await tx.products.update({
          where: {
            id: item.productId,
          },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      return tx.order.findUnique({
        where: {
          id: newOrder.id,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    });

    return order;
  }

  async getOrderById(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async cancelOrderById(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    if (order.status !== 'PENDING') {
      throw new BadRequestException('Only pending orders can be canceled');
    }

    await this.prisma.$transaction(async (tx) => {
      // Update order status to canceled
      await tx.order.update({
        where: { id: orderId },
        data: { status: 'CANCELLED' },
      });

      // Restore product stock
      for (const item of order.items) {
        await tx.products.update({
          where: { id: item.productId },
          data: {
            quantity: {
              increment: item.quantity,
            },
          },
        });
      }
    });

    return {
      msg: 'Order canceled successfully',
    };
  }

  /**
   * ============ ADMIN ROUTES ============
   */

  async getOrdersForAdmin() {
    const orders = await this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      orders,
    };
  }

  async getOrderByIdForAdmin(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrderStatusForAdmin(orderId: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return {
      order: updatedOrder,
    };
  }
}
