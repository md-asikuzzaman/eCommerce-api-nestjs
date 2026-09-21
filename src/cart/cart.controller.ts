import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { User } from 'src/auth/types/authenticated-user.type';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@CurrentUser() user: User) {
    return this.cartService.getCart(user.id);
  }

  @Post('items')
  addToCart(@CurrentUser() user: User, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(user.id, dto);
  }

  @Patch('items/:productId')
  updateCartItem(
    @CurrentUser() user: User,
    @Body() dto: UpdateCartItemDto,
    @Param('productId') productId: string,
  ) {
    return this.cartService.updateCartItem(user.id, dto, productId);
  }

  @Delete('items/:productId')
  removeCartItem(
    @CurrentUser() user: User,
    @Param('productId') productId: string,
  ) {
    return this.cartService.deleteCartItem(user.id, productId);
  }

  @Delete()
  clearCart(@CurrentUser() user: User) {
    return this.cartService.clearCart(user.id);
  }
}
