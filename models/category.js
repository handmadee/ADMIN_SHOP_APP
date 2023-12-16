'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
 
    static associate({Product}) {
      this.hasMany(Product,{foreignKey:'category_id'})
    }
  }
  Category.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};