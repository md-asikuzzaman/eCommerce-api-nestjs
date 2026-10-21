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
import { ApiBearerAuthDocs } from 'src/auth/swagger/auth.doc';
import { ApiTags } from '@nestjs/swagger';
import {
  GetOrderByIdForAdminDocs,
  GetOrdersForAdminDocs,
  UpdateOrderStatusForAdminDocs,
} from './swagger/orders.docs';

@ApiTags('Orders - Admin')
@Controller('admin/orders')
@ApiBearerAuthDocs()
export class AdminOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @GetOrdersForAdminDocs()
  getOrdersForAdmin() {
    return this.ordersService.getOrdersForAdmin();
  }
  @Roles(Role.ADMIN)
  @Get(':orderId')
  @GetOrderByIdForAdminDocs()
  getOrderByIdForAdmin(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.ordersService.getOrderByIdForAdmin(orderId);
  }
  @Roles(Role.ADMIN)
  @Patch(':orderId/status')
  @UpdateOrderStatusForAdminDocs()
  updateOrderStatus(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatusForAdmin(orderId, dto.status);
  }
}
