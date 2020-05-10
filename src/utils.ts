import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

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