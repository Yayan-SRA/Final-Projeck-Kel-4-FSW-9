'use strict';

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
     await queryInterface.bulkInsert('Kategoris', [{
      macam: 'Kendaraan',
      // isBetaMember: false
    }, {
      macam: 'Elektronik'
    },{
        macam: 'Pakaian'
      },{
        macam: 'Sepatu'
      },{
        macam: 'Perabot'
      }
], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
