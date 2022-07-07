"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Penawaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penawaran.belongsTo(models.Product, {
        foreignKey: 'id_produk'
      })
      Penawaran.belongsTo(models.Status, {
        foreignKey: 'id_status'
      })
      Penawaran.belongsTo(models.User, {
        foreignKey: 'id_user'
      })
      Penawaran.hasMany(models.Penjualan, {
        as: 'Penjualan',
        foreignKey: 'id_penawaran'
      })
      Penawaran.hasMany(models.Pembelian, {
        as: 'Pembelian',
        foreignKey: 'id_penawaran'
      })
    }
  }
  Penawaran.init(
    {
      id_user:DataTypes.INTEGER,
      id_produk:DataTypes.INTEGER,
      id_status:DataTypes.INTEGER,
      jumlah:DataTypes.INTEGER,
      penawaranHarga:DataTypes.INTEGER,
      keterangan:DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "Penawaran",
    }
  );
  return Penawaran;
};

