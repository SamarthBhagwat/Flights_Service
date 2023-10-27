'use strict';
const {SEAT_TYPE} = require('../utils/enum/enum');
const {ECONOMY, BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS} = SEAT_TYPE;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      col: {
        type: Sequelize.STRING(1),
        allowNull: false
      },
      seatType: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [ECONOMY, BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS],
        defaultValue: ECONOMY
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};