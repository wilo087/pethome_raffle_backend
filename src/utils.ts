import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const prisma = new PrismaClient();
const SECRET: string  = process.env.SECRET_JWT as string;

export interface Request {
  get(param: string): string;
}


export interface User {
  id?: number;
  nombre: string;
  codigo: number;
  cedula: number;
  data?: User;
}


export interface Context {
  prisma: any;
  request: Request;
}


export interface Auth {
  data: {
    user: string;
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
    throw new Error('Unauthorized');
  }

  token = token.replace('Bearer', '');

  return jwt.verify(token.trim(), SECRET);
}