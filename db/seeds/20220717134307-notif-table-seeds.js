'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('Notifs', [{
      id_user: 1,
      id_pembeli: 2,
      id_produk: 1,
      dibaca: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id_user: 2,
      id_pembeli: 1,
      id_produk: 1,
      dibaca: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id_user: 1,
      id_pembeli: 0,
      id_produk: 2,
      dibaca: false,
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
    await queryInterface.bulkDelete("Notifs", null, {});
  }
};
