import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const prisma = new PrismaClient()
const SECRET: string = process.env.SECRET_JWT as string

export interface Request {
    get?(param: string): string;
}

type Req  = {
    request: {headers: {authorization: string}};
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
export function generateToken ( user: string ): string {
    return jwt.sign({user}, SECRET, {expiresIn: '24h'})
}

/**
 * check if user is auth
 * @param req 
 * @param res 
 * @param next 
 */
export function isAuth(req: Req): string | object {
    
    let token = req.request.headers.authorization

    if(!token)
        throw new Error('Unauthorized')

    token = token.replace('Bearer', '')
    const data = jwt.verify(token, SECRET)
    return data
}