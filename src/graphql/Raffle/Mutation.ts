import { User, Context, generateToken, Auth, isAuth} from '../../utils'
import bcrypt from 'bcrypt'

/**
 * this function create user
 * @param parent 
 * @param args 
 * @param ctx 
 */
function createUser(parent: object, args: User, ctx: Context): User {
    const {prisma, request} = ctx
    const {data} = args
    
    isAuth(request)

    return prisma.users.create({
        data
    })
}

/**
 * Update User
 * @param parent 
 * @param args 
 * @param ctx 
 */
function updateUser(parent: object, args: User, ctx: Context): User {
    const {prisma, request} = ctx
    const {id, data} = args

    isAuth(request)

    return prisma.users.update({
        where:{
            id: Number(id)
        },
        data
    })

}


/**
 * Delete User
 * @param parent 
 * @param args 
 * @param ctx 
 */
function deleteUser (parent: object, args: User, ctx: Context): User {
    const {prisma, request} = ctx
    const {id} = args

    isAuth(request)

    return prisma.users.delete({
        where: {
            id: Number(id)
        }
    })
}

/**
 * return a random user winner 
 * and update field winner to 1
 * @param parent 
 * @param args 
 * @param ctx 
 */
async function selectWinner(parent: object, args: User, ctx: Context): Promise<User> {
    const {prisma, request} = ctx

    isAuth(request)
  
    // Query to get user random
    const userWinner: [User] = await prisma.raw<User>`SELECT *FROM users
    WHERE winner = 0 
    ORDER BY RAND()
    LIMIT 1;`

    return prisma.users.update({
        where: {
            id: Number(userWinner[0].id)
        },
        data:{
            winner: 1
        }
    })

}

/**
 * login function
 * return user authorized
 * @param parent 
 * @param args 
 * @param ctx 
 */
async function login (parent: object, args: Auth, ctx: Context): Promise<object> {
    const {user, password} = args.data
    const {prisma} = ctx
  
    const auth = await prisma.auth.findOne({
        where:{
            user
        }
    })

    if(!auth)
        throw new Error('Invalid Credentials')
  
    const isAuth = await bcrypt.compare(password, auth.password)

    if(!isAuth)
        throw new Error('Invalid Credentials')

    const token: string = generateToken(auth.user)
    
    return {
        token
    }
}

export const Mutation = {
    createUser, updateUser, deleteUser, selectWinner, login
}