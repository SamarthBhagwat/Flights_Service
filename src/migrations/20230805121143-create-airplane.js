'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Airplanes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modelNumber: {
        type: Sequelize.STRING,
        validate:{
          type: Sequelize.STRING
        }
      },
      capacity: {
        type: Sequelize.INTEGER,
        validate:{
          isInt: true,
          min: 0,
          max: 1000
        }
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
    await queryInterface.dropTable('Airplanes');
  }
};