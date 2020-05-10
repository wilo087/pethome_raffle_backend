import { User, Context} from '../../utils'

/**
 * return all user
 * or specific user
 * @param parent 
 * @param args 
 * @param ctx 
 */
function getUser(parent: object, args: User, ctx: Context): User {
    const {prisma} = ctx
    const {id} = args

    if(!id)
        return prisma.users.findMany()
   
    return prisma.users.findOne({
        where:{
            id: Number(id)
        }
    })
}

/**
 * return all
 * users winner
 * @param parent 
 * @param args 
 * @param ctx 
 */
function getAllWinner(parent: object, args: User, ctx: Context): User {
    const {prisma} = ctx
    return prisma.users.findMany({
        where:{
            winner: 1
        }
    })
}


export const Query = {
    getUser, getAllWinner
}