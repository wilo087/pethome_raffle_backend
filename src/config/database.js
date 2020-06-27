import dotenv from 'dotenv';

// Get env var from .env
dotenv.config()
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const config = {
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  define: {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      // underscored: false,
      // freezeTableName: false,
      // syncOnAssociation: true,
      charset: 'utf8',
      // collate: 'utf8_general_ci',
      // timestamps: true,
      // timezone: '00:00',
      // logging: true
    }
  }
}

export default config;