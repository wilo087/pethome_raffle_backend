import { ApolloServer } from 'apollo-server';
import { types as typeDefs, resolvers } from './graphql';
import { prisma, Option, errorName, formatErr } from './utils';
import IsAuthenticatedDirective from './Directives';


process.on('unhandledRejection', (reason, promise): void => {
  console.log(`reason: ${reason}, promise: ${promise}`);
});

const options: Option = {
  port: Number(process.env.GRAPHQL_PORT),
  endpoint: process.env.GRAPHQL_ENDPOINT || '/graphql',
  playground: process.env.GRAPHQL_PLAYGROUND || '/playground',
  debug: process.env.NODE_ENV === 'production',
};


const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
  },
  context: (request): object => ({ request, prisma, errorName }),
  formatError: (err) => {
    console.error(err);
    return formatErr.getError(err);
  },
  introspection: true,
  playground: true,
});

server.listen({ ...options }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});


