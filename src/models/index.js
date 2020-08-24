import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

import users from '../seeds/Users';
const filebasename = path.basename(__filename);
const db = {};

// Get env var from .env
dotenv.config()
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_FORCE_RESTART } = process.env;

const config = {
  host: DB_HOST,
  dialect: 'mysql',
  logging: process.env.ENV === 'production' ? false : console.log,
  dialectOptions: {
    charset: 'utf8',
  }
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, config);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    const returnFile = (file.indexOf('.') !== 0)
      && (file !== filebasename)
      && (file.slice(-3) === '.js');
    return returnFile;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes)
    db[model.name] = model;
  });


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const sequelizeOptions = { logging: config.logging, };

// Removes all tables and recreates them (only available if env is not in production)
if (DB_FORCE_RESTART === 'true' && process.env.ENV !== 'production') {
  sequelizeOptions.force = true;
}

sequelize.sync(sequelizeOptions).then(async () => {
  await db.User.bulkCreate(users)
})
  .catch((err) => {
    console.log(err);
    process.exit();
  });

module.exports = db;
