
import { AuthenticationError } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// TODO
const formatError = require('easygraphql-format-error');

export const formatErr = new formatError([{
  name: 'EXISTS',
  message: 'User exists',
  statusCode: '409',
}]);
// pass the errorName on the context
export const errorName = formatErr.errorName;

dotenv.config();

export const prisma = new PrismaClient({
  errorFormat: 'minimal',
});
const SECRET: string  = process.env.SECRET_JWT || '';

export interface Request {
  get(param: string): string;
}


export interface User {
  id?: number;
  name: string;
  code: number;
  identificationCard: number;
  data: User;
}


export interface Context {
  prisma: any;
  request: Request;
  errorName?: any;
}


export interface Auth {
  data: {
    username: string;
    password: string;
  };
}

export interface Option {
  port: number;
  endpoint: string;
  playground: string;
  debug: boolean;
}

/**
 * return jwt token
 * @param user
 */
export function generateToken(user: string): string {
  return jwt.sign({ user }, SECRET, { expiresIn: '24h' });
}

/**
 * Checks if user is authenticated
 * @param token @string
 */
export function isAuth(token: string): string | object {

  if (!token) {
    throw new AuthenticationError('Unauthorized');
  }

  return jwt.verify(token.replace('Bearer ', ''), SECRET);
}
