import { User, Context, generateToken, Auth} from '../../utils'
import bcrypt from 'bcrypt'

/**
 * this function create user
 * @param parent 
 * @param args 
 * @param ctx 
 */
async function createUser(parent: object, args: User, ctx: Context): Promise<User> {
  const {prisma} = ctx
  const {data} = args
    

  try {
    const userCreated =  await prisma.users.create({
      data
    })

    return userCreated
  }catch(e){
    if(e.code === 'P2002')
      throw Error(`El campo ${e.meta.target} ya existe`)
        
    throw Error ('Ocurrio un error')
  }
   
}

/**
 * Update User
 * @param parent 
 * @param args 
 * @param ctx 
 */
function updateUser(parent: object, args: User, ctx: Context): User {
  const {prisma} = ctx
  const {id, data} = args

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
  const {prisma} = ctx
  const {id} = args

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
  const {prisma} = ctx
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

  if(!auth || auth == null)
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