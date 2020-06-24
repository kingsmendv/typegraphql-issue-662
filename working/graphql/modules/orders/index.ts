import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import { UsersModule } from "@modules/users";

import { OrdersProvider } from "./orders.provider";
import { OrderResolver } from './order.resolver';
import { UserResolver } from './user.resolver';

import { Order } from './order.type';
import { ORDERS } from './orders.symbol';

export const OrdersModule = new GraphQLModule({
  imports: [
    UsersModule,
  ],
  providers: ({ config }: { config: { orders: Order[] } }) => [
    {
      provide: ORDERS,
      useValue: config.orders,
    },
    OrdersProvider,
    OrderResolver,
    UserResolver,
  ],
  extraSchemas: () => [
    buildSchemaSync({
      resolvers: [
        OrderResolver,
        UserResolver,
      ],
      container: ({ context }) => OrdersModule.injector.getSessionInjector(context),
    }),
  ]
});
