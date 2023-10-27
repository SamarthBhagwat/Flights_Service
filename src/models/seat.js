'use strict';
const {SEAT_TYPE} = require('../utils/enum/enum');
const { ECONOMY, BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS} = SEAT_TYPE;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        onDelete: 'CASCADE'
      });
    }
  }
  Seat.init({
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    col: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    seatType: {
      type: DataTypes.ENUM,
      allowNull: false,
      values:[ECONOMY, BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS],
      defaultValue: ECONOMY
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};