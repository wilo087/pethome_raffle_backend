import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const prisma = new PrismaClient()
const SECRET: string = <string>process.env.SECRET

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



/**
 * return jwt token
 * @param user 
 */
export function generateToken ( user: string ): string {
    return jwt.sign({user}, SECRET)
}
