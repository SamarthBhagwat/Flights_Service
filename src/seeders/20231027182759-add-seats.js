'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Seats', [
    {
      airplaneId: 1,
      row: 1,
      col: 'A',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      airplaneId: 1,
      row: 1,
      col: 'B',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      airplaneId: 1,
      row: 1,
      col: 'C',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      airplaneId: 1,
      row: 1,
      col: 'D',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      airplaneId: 1,
      row: 1,
      col: 'E',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      airplaneId: 1,
      row: 1,
      col: 'F',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      airplaneId: 1,
      row: 2,
      col: 'A',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      airplaneId: 1,
      row: 2,
      col: 'B',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      airplaneId: 1,
      row: 2,
      col: 'C',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      airplaneId: 1,
      row: 2,
      col: 'D',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      airplaneId: 1,
      row: 2,
      col: 'E',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      airplaneId: 1,
      row: 2,
      col: 'F',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Seats', {});
  }
};
