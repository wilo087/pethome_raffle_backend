import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const prisma = new PrismaClient()
const SECRET: string = <string>process.env.SECRET_JWT

console.log(process.env.SECRET_JWT)
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
    data : {
        user: string
        password: string
    }
}

/**
 * return jwt token
 * @param user 
 */
export function generateToken ( user: string ): string {
    return jwt.sign({user}, SECRET)
}
