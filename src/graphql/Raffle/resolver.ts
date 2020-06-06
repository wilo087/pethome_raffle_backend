import { User, Context, generateToken, Auth } from '../../utils';
import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';

export default {
  Query: {

    getUser(_: void, args: User, ctx: Context): User {
      const { prisma } = ctx;
      const { id } = args;

      if (!id) {
        return prisma.users.findMany();
      }

      return prisma.users.findOne({ where: { id: Number(id) } });
    },

    getAllWinner(_: void, args: User, ctx: Context): User {
      const { prisma } = ctx;

      return prisma.users.findMany({ where: { winner: 1 } });
    },
  },

  Mutation: {

    createUser(_: void, args: User, ctx: Context): User {
      const { prisma } = ctx;
      const { data } = args;

      try {
        return prisma.users.create({ data });
      } catch (e) {
        throw e;
      }

    },


    updateUser(_: void, args: User, ctx: Context): User {
      const { prisma } = ctx;
      const { id, data } = args;

      return prisma.users.update({
        where: { id: Number(id) },
        ...data,
      });

    },

    deleteUser(_: void, args: User, ctx: Context): User {
      const { prisma } = ctx;
      const { id } = args;

      return prisma.users.delete({ where: { id: Number(id) } });
    },


    async selectWinner(_: void, args: User, ctx: Context): Promise<User> {
      const { prisma } = ctx;

      // Query to get user random
      const userWinner: [User] = await prisma.raw<User>`SELECT *FROM users
        WHERE winner = 0
        ORDER BY RAND()
        LIMIT 1;`;

      return prisma.users.update({
        where: { id: Number(userWinner[0].id) },
        data: { winner: 1 },
      });

    },

    async login(_: void, args: Auth, ctx: Context): Promise<{ token: string }> {
      const { user, password } = args.data;
      const { prisma } = ctx;

      const auth = await prisma.auth.findOne({ where: { user } });

      if (!auth) {
        throw new AuthenticationError('Invalid Credentials');
      }

      const isAuth = await bcrypt.compare(password, auth.password);

      if (!isAuth) {
        throw new AuthenticationError('Invalid Credentials');
      }
      const token: string = generateToken(auth.user);
      return { token };

    },
  },
};
