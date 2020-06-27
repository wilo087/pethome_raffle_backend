import dotenv from 'dotenv';
import { CLIENT_RENEG_LIMIT } from 'tls';
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const filebasename = path.basename(__filename);
const db = {};

// Get env var from .env
dotenv.config()
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_FORCE_RESTART} = process.env;

const config = {
  host: DB_HOST,
  dialect: 'mysql',
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

const sequelizeOptions = { logging: console.log, };

// Removes all tables and recreates them (only available if env is not in production)
if (DB_FORCE_RESTART === 'true' && process.env.ENV !== 'production') {
  sequelizeOptions.force = true;
}

sequelize.sync(sequelizeOptions)
  .catch((err) => {
    console.log(err);
    process.exit();
  });

module.exports = db;