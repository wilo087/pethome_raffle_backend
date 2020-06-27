'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/database';

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';

let db = {};
const { database, username, password, define } = config


// var exec = require('child_process').exec;
// console.log(`Developer environment: ${env}`);
const sequelize = new Sequelize(database, username, password, define);

// const test = async () => {
//   try {
//     await sequelize.authenticate();
//     const msg = 'Connection has been established successfully.'
//     console.log(msg);
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// test()
fs
.readdirSync(__dirname)
.filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
});

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function (file) {
    // let model = sequelize['import'](path.join(__dirname, file));
    const model = sequelize.require(path.join(__dirname, file));
    console.info(model.name);
    // db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// sequelize.sync({ force: true, logging: console.log });

// if (env == 'production') { // If in development environment
//   sequelize.sync().then();
// } else {
//   sequelize.sync({ force: true, logging: console.log }).then(function () {
//     // var cmd = 'sequelize db:seed:all';
//     // exec(cmd, function (error, stdout, stderr) {
//     //   // command output is in stdout
//     //   console.log(stdout);
//     // });
//   });
// }

module.exports = db;
