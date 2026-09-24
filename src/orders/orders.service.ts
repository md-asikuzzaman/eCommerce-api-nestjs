import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
    });

    return { orders };
  }

  createOrder() {
    return {
      msg: 'create order',
    };
  }

  getOrderById(orderId: string) {
    return {
      msg: 'get order by ID' + orderId,
    };
  }

  cancelOrderById(orderId: string) {
    return {
      msg: 'cancel order by ID' + orderId,
    };
  }

  getOrdersForAdmin() {
    return {
      msg: 'get orders by admin',
    };
  }

  getOrderByIdForAdmin(orderId: string) {
    return {
      msg: 'get order by ID for admin' + orderId,
    };
  }

  updateOrderStatus(orderId: string) {
    return {
      msg: 'update order status by ID' + orderId,
    };
  }
}
