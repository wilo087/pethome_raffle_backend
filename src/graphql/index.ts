import { mergeResolvers, mergeTypes, fileLoader } from 'merge-graphql-schemas';
import path from 'path';

let extensionFiles: string = '.ts';

if (process.env.NODE_ENV === 'producction') {
    extensionFiles = '.js';
}

const typesArray: string[] = fileLoader(path.join(__dirname, '/**/*.graphql'));
const resolversArray = fileLoader(path.join(__dirname, `**/resolver${extensionFiles}`));

export const types: string = mergeTypes(typesArray);
export const resolvers = mergeResolvers(resolversArray);
