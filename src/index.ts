import { ApolloServer } from 'apollo-server'
import { types as typeDefs, resolvers } from './graphql'
import { prisma, Option } from './utils'
import IsAuthenticatedDirective from './Directives'


const options: Option = {
  port: Number(process.env.GRAPHQL_PORT),
  endpoint: String(process.env.GRAPHQL_PLAYGROUND),
  playground: String(process.env.GRAPHQL_PLAYGROUND),
  debug: Boolean(process.env.DEBUG)
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective
  },
  context: (request): object => ({ request, prisma }),
});

server.listen(options.port).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});


