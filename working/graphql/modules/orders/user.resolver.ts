import {
  Resolver,
  FieldResolver,
  Root,
  Mutation,
  Arg,
} from 'type-graphql';
import { OrdersProvider } from "./orders.provider";
import { User } from "@modules/users/user.type";
import { Order } from "./order.type";
import { UsersProvider } from '@modules/users/users.provider';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private ordersProvider: OrdersProvider,
    private usersProvider: UsersProvider,
  ) {}

  @FieldResolver(returns => [Order])
  async orders(@Root() root: User) {
    return this.ordersProvider.getOrdersByUserId(root.id);
  }

  @Mutation(returns => Order)
  async order(@Arg('userId') userId: string): Promise<Order> {
    const user = await this.usersProvider.getUserById(userId);

    if(!user) {
      throw new Error('Heck off');
    }

    return this.ordersProvider.placeOrder(user);
  }
}
