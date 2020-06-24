import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import { UsersProvider } from "./users.provider";
import { UserResolver } from './user.resolver';
import { User } from './user.type';
import { USERS } from './users.symbol';

const schema = buildSchemaSync({
  resolvers: [
    UserResolver
  ],
  container: ({ context }) => context.injector,
});

export const UsersModule = new GraphQLModule({
  providers: ({ config }: { config: { users: User[] } }) => [
    {
      provide: USERS,
      useValue: config.users,
    },
    UsersProvider,
    UserResolver,
  ],
  extraSchemas: () => [
    buildSchemaSync({
      resolvers: [
        UserResolver,
      ],
      container: ({ context }) => UsersModule.injector.getSessionInjector(context),
    }),
  ]
});
