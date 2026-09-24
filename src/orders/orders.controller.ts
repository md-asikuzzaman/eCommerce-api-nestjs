import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
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
