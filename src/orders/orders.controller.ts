import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { User } from 'src/auth/types/authenticated-user.type';
import { Message } from 'src/common/decorators/message.decorator';
import { ApiBearerAuthDocs } from 'src/auth/swagger/auth.doc';

@Controller('orders')
@ApiBearerAuthDocs()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Message('Orders fetched successfully')
  @HttpCode(HttpStatus.OK)
  getOrders(@CurrentUser() user: User) {
    return this.ordersService.getOrders(user.id);
  }

  @Post()
  @Message('Order created successfully')
  createOrder(@CurrentUser() user: User) {
    return this.ordersService.createOrder(user.id);
  }

  @Get(':orderId')
  @Message('Order fetched successfully')
  getOrderById(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.ordersService.getOrderById(orderId);
  }

  @Patch(':orderId/cancel')
  @Message('Order cancelled successfully')
  cancelOrderById(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.ordersService.cancelOrderById(orderId);
  }
}
