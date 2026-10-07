import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/types/authenticated-user.type';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { AuthDocs } from 'src/auth/swagger/auth.doc';

@Controller('admin/orders')
@AuthDocs()
export class AdminOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles(Role.ADMIN)
  getOrdersForAdmin() {
    return this.ordersService.getOrdersForAdmin();
  }
  @Roles(Role.ADMIN)
  @Get(':orderId')
  getOrderByIdForAdmin(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.ordersService.getOrderByIdForAdmin(orderId);
  }
  @Roles(Role.ADMIN)
  @Patch(':orderId/status')
  updateOrderStatus(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatusForAdmin(orderId, dto.status);
  }
}
