'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notif extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Notif.belongsTo(models.User, {
                foreignKey: 'id_user'
            })
            Notif.belongsTo(models.Pembelian, {
                foreignKey: 'id_pembeli'
            })
            Notif.belongsTo(models.Product, {
                foreignKey: 'id_produk'
            })
        }
    }
    Notif.init({
        id_user: DataTypes.INTEGER,
        id_pembeli: DataTypes.INTEGER,
        id_produk: DataTypes.INTEGER,
        id_penawaran: DataTypes.INTEGER,
        dibaca: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Notif',
    });
    return Notif;
};