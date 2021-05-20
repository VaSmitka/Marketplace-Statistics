'use strict';

var { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsersEvents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  UsersEvents.init({
    eventType: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    gender: DataTypes.INTEGER,
    role: DataTypes.INTEGER,
    acountCreated: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UsersEvents',
  });

  return UsersEvents;
}