"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Penjualan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penjualan.belongsTo(models.Product, {
        foreignKey: 'id_produk'
      })
      Penjualan.belongsTo(models.User, {
        foreignKey: 'id_pembeli'
      })
      Penjualan.belongsTo(models.Penawaran, {
        foreignKey: 'id_penawaran'
      })
    }
  }
  Penjualan.init(
    {
      id_pembeli:DataTypes.INTEGER,
      id_produk:DataTypes.INTEGER,
      id_penawaran:DataTypes.INTEGER,
      jumlahProduk: DataTypes.INTEGER,
      totalHarga:DataTypes.INTEGER
      

    },
    {
      sequelize,
      modelName: "Penjualan",
    }
  );
  return Penjualan;
};

