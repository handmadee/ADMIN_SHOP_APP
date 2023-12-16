'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detailOrder extends Model {
    static associate({Orders,Product}) {
        this.belongsTo(Orders, {foreignKey:'idOrder'}),
        this.hasMany(Product, {foreignKey:'idProduct'})
    }
  }
  detailOrder.init({
    countProduct: DataTypes.INTEGER,
    idOrder: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
        key:'id'
      }
    },
    idProduct: {
      allowNull:'false',
      type: DataTypes.INTEGER,
      references:{
        model: 'Product',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'detailOrders',
  });
  return detailOrder;
};