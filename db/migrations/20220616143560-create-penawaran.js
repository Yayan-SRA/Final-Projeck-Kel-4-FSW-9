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
      keterangan : {
        type: Sequelize.TEXT
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
