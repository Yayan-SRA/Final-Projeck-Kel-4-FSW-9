'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        as: 'Product',
        foreignKey: 'id_penjual'
      })
      User.hasMany(models.Penawaran, {
        as: 'Penawaran',
        foreignKey: 'id_user'
      })
      User.hasMany(models.Pembelian, {
        as: 'Pembelian',
        foreignKey: 'id_user'
      })
      User.hasMany(models.Penjualan, {
        as: 'Penjualan',
        foreignKey: 'id_pembeli'
      })
    }
  }
  User.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    kota: DataTypes.STRING,
    alamat: DataTypes.STRING,
    nomor_hp: DataTypes.STRING,
    image:DataTypes.STRING,
    refresh_token :DataTypes.STRING,
    verifikasi:DataTypes.STRING,
    OTP:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};