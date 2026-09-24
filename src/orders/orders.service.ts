import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  getOrders() {
    return {
      msg: 'all orders',
    };
  }
  createOrder() {
    return {
      msg: 'create order',
    };
  }

  getOrderById(orderId: string) {
    return {
      msg: 'get order by ID' + orderId,
    };
  }

  cancelOrderById(orderId: string) {
    return {
      msg: 'cancel order by ID' + orderId,
    };
  }

  getOrdersForAdmin() {
    return {
      msg: 'get orders by admin',
    };
  }

  getOrderByIdForAdmin(orderId: string) {
    return {
      msg: 'get order by ID for admin' + orderId,
    };
  }

  updateOrderStatus(orderId: string) {
    return {
      msg: 'update order status by ID' + orderId,
    };
  }
}
