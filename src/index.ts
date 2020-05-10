import {GraphQLServer} from 'graphql-yoga'
import {types as typeDefs, resolvers} from './graphql'
import { Request, Context, prisma} from './utils'
import dotenv from 'dotenv'

dotenv.config()

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

server.start(({ port }): void => {
    console.log(`Server Running on http://localhost:${port}`)
})