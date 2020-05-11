import path from 'path'
import {mergeResolvers, mergeTypes, fileLoader} from 'merge-graphql-schemas'

const typesArray: string[] =  fileLoader(path.join(__dirname, '/**/*.graphql'))
const resolversArray = fileLoader(path.join(__dirname, '**/**/*.ts'))

export const types: string = mergeTypes(typesArray)
export const resolvers = mergeResolvers(resolversArray)
