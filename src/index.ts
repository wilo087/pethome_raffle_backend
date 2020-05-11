import {GraphQLServer} from 'graphql-yoga'
import {types as typeDefs, resolvers} from './graphql'
import { Request, Context, prisma, Option} from './utils'



const options: Option =  {
    port: Number(process.env.GRAPHQL_PORT),
    endpoint: String(process.env.GRAPHQL_PLAYGROUND),
    playground: String(process.env.GRAPHQL_PLAYGROUND),
    debug: Boolean(process.env.DEBUG)
}

const server: GraphQLServer = new GraphQLServer({
    typeDefs,
    resolvers,
    context: (request: Request): Context => {
        return {
            request,
            prisma
        }
    }
})



server.start(options, ({port}): void => {
    console.log(`Server Running on http://localhost:${port}`)
})

