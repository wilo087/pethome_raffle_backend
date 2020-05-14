import { User, Context } from '../../utils'

export const Query = {
  /**
   * return all user
   * or specific user
   * @param parent 
   * @param args 
   * @param ctx 
   */
  getUser(_: void, args: User, ctx: Context): User {
    const { prisma } = ctx;
    const { id } = args;

    if (!id) {
      return prisma.users.findMany();
    }

    return prisma.users.findOne({ where: { id: Number(id) } });
  },

  /**
  * return all
  * users winner
  * @param parent 
  * @param args 
  * @param ctx 
  */
  getAllWinner(_: void, args: User, ctx: Context): User {
    const { prisma } = ctx;

    return prisma.users.findMany({ where: { winner: 1 } });
  }

}