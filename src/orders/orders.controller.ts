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

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Message('Orders fetched successfully')
  @HttpCode(HttpStatus.OK)
  getOrders(@CurrentUser() user: User) {
    return this.ordersService.getOrders(user.id);
  }

  @Post()
  createOrder() {
    return this.ordersService.createOrder();
  }

  @Get(':orderId')
  getOrderById(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.ordersService.getOrderById(orderId);
  }

  @Patch(':orderId/cancel')
  cancelOrderById(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.ordersService.cancelOrderById(orderId);
  }
}
