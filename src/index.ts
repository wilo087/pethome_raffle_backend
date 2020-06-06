import { ApolloServer } from 'apollo-server';
import { types as typeDefs, resolvers } from './graphql';
import { prisma, Option } from './utils';
import IsAuthenticatedDirective from './Directives';


const options: Option = {
  port: Number(process.env.GRAPHQL_PORT),
  endpoint: process.env.GRAPHQL_ENDPOINT || '/graphql' ,
  playground: process.env.GRAPHQL_PLAYGROUND || '/playground',
  debug: Boolean(process.env.DEBUG) || false,
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
  },
  context: (request): object => ({ request, prisma }),
});

server.listen({ ...options }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});


