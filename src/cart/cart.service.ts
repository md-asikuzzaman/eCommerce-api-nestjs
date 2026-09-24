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

  updateCartItem(id: string, dto: UpdateCartItemDto, productId: string) {
    return { id, dto, productId };
  }

  deleteCartItem(id: string, productId: string) {
    return { id, productId };
  }

  clearCart(id: string) {
    return { id };
  }
}
