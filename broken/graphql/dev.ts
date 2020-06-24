import 'reflect-metadata';
import { AppModule } from './modules/app';
import { ApolloServer } from 'apollo-server';


const users = [
  {
    id: '1',
    name: 'Russell',
  },
];

const orders = [];

const { schema, context } = AppModule.forRoot({
  users,
  orders,
});

const serverConfig = {
  introspection: true,
  schema,
  context,
};

const server = new ApolloServer(serverConfig);

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});