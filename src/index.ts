import { ApolloServer, ApolloError } from 'apollo-server';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { v4 } from 'uuid';

import { types as typeDefs, resolvers } from './graphql';
import { prisma, Option } from './utils';
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
  context: (request): object => ({ request, prisma }),
  formatError: (err: GraphQLError): GraphQLFormattedError => {
    if (err.originalError instanceof ApolloError) {
      console.info(err);
      return err;
    }

    const errorId = v4();
    console.log(`ErrorID ${errorId}`);
    console.log(err);

    return new GraphQLError(`Internal Server Error: ${errorId}`);
  },
  introspection: true,
  playground: true,
});

server.listen({ ...options }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});


