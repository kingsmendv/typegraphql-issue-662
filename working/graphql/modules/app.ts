import { GraphQLModule } from "@graphql-modules/core";

import { User } from '@modules/users/user.type';
import { UsersModule } from '@modules/users';
import { Order } from '@modules/orders/order.type';
import { OrdersModule } from '@modules/orders';

type ConfigType = {
    orders: Order[],
    users: User[],
};

export const AppModule = new GraphQLModule({
    imports: ({ config }: { config: ConfigType }) => [
        UsersModule.forRoot(config),
        OrdersModule.forRoot(config),
    ],
    configRequired: true,
});