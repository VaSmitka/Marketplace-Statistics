'use strict';

var { Model } = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  class MarketplaceEvents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  MarketplaceEvents.init({
    eventType: DataTypes.STRING,
    offerId: DataTypes.INTEGER,
    posterId: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    offerCreated: DataTypes.DATE,
    offerClosed: DataTypes.DATE                       
  }, {
    sequelize,
    modelName: 'MarketplaceEvents',
  });

  return MarketplaceEvents;
}