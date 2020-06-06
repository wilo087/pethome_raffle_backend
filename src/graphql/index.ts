import { mergeResolvers, mergeTypes, fileLoader } from 'merge-graphql-schemas';
import path from 'path';

const typesArray: string[] = fileLoader(path.join(__dirname, '/**/*.graphql'));
const resolversArray = fileLoader(path.join(__dirname, '**/**/resolver'),
                                  { extensions: ['ts', 'js'] },
);

export const types: string = mergeTypes(typesArray);
export const resolvers = mergeResolvers(resolversArray);
