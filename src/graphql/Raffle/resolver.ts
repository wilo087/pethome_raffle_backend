import { AuthenticationError, ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';

import { User, Context, generateToken, Auth } from '../../utils';

export default {
  Query: {

    getUser(_: void, args: User, ctx: Context): User {
      const { prisma } = ctx;
      const { id } = args;

      try {
        if (!id) {
          return prisma.users.findMany();
        }

        return prisma.users.findOne({ where: { id: Number(id) } });
      } catch (e) {
        throw e;
      }
    },

    getAllWinner(_: void, args: void, ctx: Context): User {
      const { prisma } = ctx;
      try {
        return prisma.users.findMany({ where: { winner: 1 } });
      } catch (e) {
        throw e;
      }
    },
  },

  Mutation: {

    async createUser(_: void, args: User, ctx: Context): Promise<User> {
      const { prisma } = ctx;
      const { data } = args;

      try {
        const user: User[] = await prisma.users.findMany({
          where: { code: data.code },
        });

        if (user.length > 0) {
          throw new ApolloError('code exists', 'CONFLIT');
        }

        return prisma.users.create({ data });

      } catch (e) {
        throw e;
      }

    },


    updateUser(_: void, args: User, ctx: Context): User {
      const { prisma } = ctx;
      const { id, data } = args;

      try {
        return prisma.users.update({
          where: { id: Number(id) },
          ...data,
        });

      } catch (e) {
        throw e;
      }

    },

    deleteUser(_: void, args: User, ctx: Context): User {
      const { prisma } = ctx;
      const { id } = args;
      try {
        return prisma.users.delete({ where: { id: Number(id) } });
      } catch (e) {
        throw e;
      }
    },


    async selectWinner(_: void, args: void, ctx: Context) {
      const { prisma } = ctx;

      try {
        // Query to get user random
        const userWinner: User[] = await prisma.raw<User>`SELECT *FROM users
          WHERE winner = 0
          ORDER BY random()
          LIMIT 1;`;

        return prisma.users.update({
          where: { id: Number(userWinner[0].id) },
          data: { winner: 1 },
        });

      } catch (e) {
        throw e;
      }

    },

    async login(_: void, args: Auth, ctx: Context): Promise<{ token: string }> {
      const { username, password } = args.data;
      const { prisma } = ctx;

      try {
        const auth = await prisma.auth.findOne({ where: { username } });

        if (!auth) {
          throw new AuthenticationError('Unauthorized');
        }

        const isAuth = await bcrypt.compare(password, auth.password);

        if (!isAuth) {
          throw new AuthenticationError('Unauthorized');
        }

        const token: string = generateToken(auth.username);
        return { token };

      } catch (e) {
        throw e;
      }

    },
  },
};
