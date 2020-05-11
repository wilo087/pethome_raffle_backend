import { User, Context, generateToken, Auth } from '../../utils'
import bcrypt from 'bcrypt'

export const Mutation = {
  /**
 * this function create user
 * @param parent 
 * @param args 
 * @param ctx 
 */
  createUser(_: object, args: User, ctx: Context): User {
    const { prisma } = ctx
    const { data } = args

    try {
      return prisma.users.create({ data })
    } catch (e) {
      if (e.code === 'P2002') {
        throw Error(`field ${e.meta.target} already exist`)
      }
      throw Error('an error occurred')
    }

  },

  /**
 * Update User
 * @param parent 
 * @param args 
 * @param ctx 
 */
  updateUser(_: object, args: User, ctx: Context): User {
    const { prisma } = ctx
    const { id, data } = args

    return prisma.users.update({
      where: { id: Number(id) },
      data
    })

  },


  /**
 * Delete User
 * @param parent 
 * @param args 
 * @param ctx 
 */
  deleteUser(_: object, args: User, ctx: Context): User {
    const { prisma } = ctx
    const { id } = args

    return prisma.users.delete({ where: { id: Number(id) } })
  },

  /**
 * return a random user winner 
 * and update field winner to 1
 * @param parent 
 * @param args 
 * @param ctx 
 */
  async selectWinner(_: object, args: User, ctx: Context): Promise<User> {
    const { prisma } = ctx

    // Query to get user random
    const userWinner: [User] = await prisma.raw<User>`SELECT *FROM users
    WHERE winner = 0 
    ORDER BY RAND()
    LIMIT 1;`

    return prisma.users.update({
      where: { id: Number(userWinner[0].id) },
      data: { winner: 1 }
    })

  },

  /**
 * login function
 * return user authorized
 * @param parent 
 * @param args 
 * @param ctx 
 */
  async login(_: object, args: Auth, ctx: Context): Promise<string> {
    const { user, password } = args.data
    const { prisma } = ctx

    const auth = await prisma.auth.findOne({ where: { user } })

    if (!auth) {
      throw new Error('Invalid Credentials')
    }

    const isAuth = await bcrypt.compare(password, auth.password)

    if (!isAuth) {
      throw new Error('Invalid Credentials')
    }

    return generateToken(auth.user)

  }

}