"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pembelians", {
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
      id_penawaran:{
        type: Sequelize.INTEGER
      },
      jumlahProduk: {
        type: Sequelize.INTEGER
      },
      totalHarga : {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable("Pembelians");
  },
};
