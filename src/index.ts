import {GraphQLServer} from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'
import {types as typeDefs, resolvers} from './graphql'

const prisma = new PrismaClient()

const server: GraphQLServer = new GraphQLServer({
    typeDefs,
    resolvers,
    context: (request): object => {
        return {
            ...request,
            prisma
        }
    }
})

server.start(({ port }): void => {
    console.log(`Server Running on http://localhost:${port}`)
})