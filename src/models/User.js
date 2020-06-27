'use strict';
var cryp = require('crypto');

module.exports = function (sequelize, DataTypes) {

  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Please enter a valid email addresss" }
      },
      isEmail: true
    },
    password_hash: { type: DataTypes.STRING(80), allowNull: false },
    password: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
        //this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
        this.setDataValue('password_hash', cryp.createHash("md5").update(val).digest("hex"));
      },
      validate: {
        isLongEnough: function (val) {
          if (val.length < 8) {
            throw new Error("Please choose a longer password");
          }
        }
      }
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }

  }, {
    classMethods: {
      associate: function (models) {
        // User.belongsTo(models.Department, { foreignKey: { allowNull: false } });
        // User.belongsTo(models.Position, { foreignKey: { allowNull: false } });
        // User.belongsTo(models.Profile, { foreignKey: { allowNull: false } });

        // User.hasMany(models.Report, { foreignKey: { allowNull: false } });
        // User.hasMany(models.Notification, { foreignKey: { allowNull: false } });
        // User.hasMany(models.Response, { foreignKey: { allowNull: false } });

      }
    },

    timestamps: true,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: false,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true
  });
  return User;
};
