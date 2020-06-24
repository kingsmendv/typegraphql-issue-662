import { Inject, Injectable } from '@graphql-modules/di';
import { Order } from './order.type';
import { ORDERS } from './orders.symbol';
import { User } from '@modules/users/user.type';

@Injectable()
export class OrdersProvider {

  constructor(
    @Inject(ORDERS) private orders: Order[],
  ) {}

  async placeOrder(user: User): Promise<Order> {
    // create the order
    const o: Order = {
      id: 'ABC_123',
      userId: user.id,
    };

    // add to array
    this.orders.push(o);

    return o;
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    return this.orders.find(o => o.id === orderId);
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.orders.filter(o => o.userId === userId);
  }
}