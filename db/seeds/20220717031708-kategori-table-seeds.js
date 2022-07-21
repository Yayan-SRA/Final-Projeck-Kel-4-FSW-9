'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('Kategoris', [{
      macam: "Sepatu",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      macam: "Kendaraan",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      macam: "Elektronik",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      macam: "Baju",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      macam: "Celana",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ],
      {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Kategoris", null, {});
  }
};
