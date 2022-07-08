"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pembelian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pembelian.belongsTo(models.Product, {
        foreignKey: 'id_produk'
      })
      Pembelian.belongsTo(models.User, {
        foreignKey: 'id_user'
      })
      Pembelian.belongsTo(models.Penawaran, {
        foreignKey: 'id_penawaran'
      })
    }
  }
  Pembelian.init(
    {
      id_user:DataTypes.INTEGER,
      id_produk:DataTypes.INTEGER,
      id_penawaran:DataTypes.INTEGER,
      jumlahProduk: DataTypes.INTEGER,
      totalHarga:DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Pembelian",
    }
  );
  return Pembelian;
};

