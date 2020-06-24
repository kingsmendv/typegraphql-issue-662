import { Resolver, Query, Arg } from 'type-graphql';
import { Order } from "./order.type";
import { OrdersProvider } from "./orders.provider";

@Resolver(of => Order)
export class OrderResolver {
    constructor(private ordersProvider: OrdersProvider){}

    @Query(returns => Order, { nullable: true })
    order(@Arg('id') id: string) {
        return this.ordersProvider.getOrderById(id);
    }
}