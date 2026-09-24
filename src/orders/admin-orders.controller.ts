import { Controller, Get, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrdersForAdmin() {
    return this.ordersService.getOrdersForAdmin();
  }

  @Get(':orderId')
  getOrderByIdForAdmin(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.ordersService.getOrderByIdForAdmin(orderId);
  }

  @Patch(':orderId/status')
  updateOrderStatus(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.ordersService.updateOrderStatus(orderId);
  }
}
