"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Penawarans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user:{
        type: Sequelize.INTEGER
      },
      id_penjual:{
        type: Sequelize.INTEGER
      },
      id_produk:{
        type: Sequelize.INTEGER
      },
      id_status:{
        type: Sequelize.INTEGER
      },
      jumlah: {
        type: Sequelize.INTEGER
      },
      penawaranHarga : {
        type: Sequelize.INTEGER
      },
      diajukanPembeli: {
        type: Sequelize.ENUM('YES', 'NO'),
        defaultValue: 'NO',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Penawarans");
  },
};
