'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category,detailOrders}) {
     this.belongsTo(Category,{foreignKey:'category_id'}),
     this.hasMany(detailOrders,{foreignKey:'idProduct'})
    }
  }
  Product.init({
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    detail: DataTypes.STRING,
    price: DataTypes.FLOAT,
    count: DataTypes.INTEGER,
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'Category',
        key:'id'
        
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Product' 
  });
  return Product;
};