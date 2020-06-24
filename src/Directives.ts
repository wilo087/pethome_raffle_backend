import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { isAuth } from './utils';

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<CallableFunction, CallableFunction>):
    GraphQLField<CallableFunction, CallableFunction> | void {

    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async function (...args: any): Promise<CallableFunction> {
      const context = args[2];

      if (!context.request.req.headers.authorization) {
        throw new AuthenticationError('Not authenticate');
      }

      isAuth(context.request.req.headers.authorization);
      return await originalResolve.apply(this, args);
    };
  }
}

export default IsAuthenticatedDirective;
