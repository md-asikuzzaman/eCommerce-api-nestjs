import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { User } from 'src/auth/types/authenticated-user.type';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart.dto';
import { Message } from 'src/common/decorators/message.decorator';
import { ApiBearerAuthDocs } from 'src/auth/swagger/auth.doc';
import {
  AddToCartDocs,
  ClearCartDocs,
  DeleteCartItemDocs,
  GetCartDocs,
  UpdateCartItemDocs,
} from './swagger/cart.docs';

@ApiBearerAuthDocs()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @Message('Cart items fetched successfully')
  @GetCartDocs()
  getCart(@CurrentUser() user: User) {
    return this.cartService.getCart(user.id);
  }

  @Post('items')
  @AddToCartDocs()
  addToCart(@CurrentUser() user: User, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(user.id, dto);
  }

  @Patch('items/:productId')
  @UpdateCartItemDocs()
  updateCartItem(
    @CurrentUser() user: User,
    @Body() dto: UpdateCartItemDto,
    @Param('productId') productId: string,
  ) {
    return this.cartService.updateCartItem(user.id, dto, productId);
  }

  @Delete('items/:productId')
  @DeleteCartItemDocs()
  deleteCartItem(
    @CurrentUser() user: User,
    @Param('productId') productId: string,
  ) {
    return this.cartService.deleteCartItem(user.id, productId);
  }

  @Delete()
  @ClearCartDocs()
  clearCart(@CurrentUser() user: User) {
    return this.cartService.clearCart(user.id);
  }
}
