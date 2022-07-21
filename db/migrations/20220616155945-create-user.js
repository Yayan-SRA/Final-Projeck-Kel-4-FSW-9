'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      kota:{
        type:Sequelize.STRING
      },
      alamat:{
        type:Sequelize.STRING
      },
      nomor_hp:{
        type:Sequelize.STRING
      },
      image:{
        type: Sequelize.STRING
      },
      refresh_token:{
        type:Sequelize.STRING
      },
      verifikasi:{
        type: Sequelize.STRING
      },
      OTP:{
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};