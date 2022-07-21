"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.Product, {
        foreignKey: 'id_produk'
      })
      Wishlist.belongsTo(models.User, {
        foreignKey: 'id_user'
      })
    }
  }
  Wishlist.init(
    {
      id_user:DataTypes.INTEGER,
      id_produk:DataTypes.INTEGER,
      diminati:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Wishlist",
    }
  );
  return Wishlist;
};

