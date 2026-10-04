import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCartItemDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: string) {
    const isExisting = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true, // Optimized fetch performance
      },
    });

    if (!isExisting) throw new NotFoundException('User not exists');

    const cartItems = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cartItems) {
      return {
        items: [],
      };
    }

    return cartItems;
  }

  async addToCart(userId: string, dto: AddToCartDto) {
    // Find or create a cart
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      create: {
        userId,
      },
      update: {},
    });

    // Create or update cartItem
    const cartItem = await this.prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: dto.productId,
        },
      },
      create: {
        cartId: cart.id,
        productId: dto.productId,
        quantity: dto.quantity,
      },
      update: {
        quantity: {
          increment: dto.quantity,
        },
      },
    });

    return {
      cart,
      cartItem,
    };
  }

  async updateCartItem(
    userId: string,
    dto: UpdateCartItemDto,
    productId: string,
  ) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (dto.quantity <= 0) {
      await this.prisma.cartItem.delete({
        where: {
          id: cartItem.id,
        },
      });

      return {
        message: 'Cart item remove successfully',
      };
    }

    const updatedItem = await this.prisma.cartItem.update({
      where: { id: cartItem.id },
      data: {
        quantity: dto.quantity,
      },
      include: {
        product: true,
      },
    });

    return updatedItem;
  }

  async deleteCartItem(userId: string, productId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });

    return {
      message: 'Cart item deleted successfully',
    };
  }

  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return {
      message: 'Cart delete successfully',
    };
  }
}
