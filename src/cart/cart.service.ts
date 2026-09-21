import { Injectable } from '@nestjs/common';
import { UpdateCartItemDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  getCart(id: string) {
    return { id };
  }

  addToCart(id: string, dto: AddToCartDto) {
    return { id, dto };
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
