import {GraphQLServer} from 'graphql-yoga'
import {types as typeDefs, resolvers} from './graphql'

const server: GraphQLServer = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(({ port }): void => {
    console.log(`Server Running on http://localhost:${port}`)
})