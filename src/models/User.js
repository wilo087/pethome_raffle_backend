'use strict';

import cryp from 'crypto';

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    document: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    code: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    won: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
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
