'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inforemation extends Model {
    static associate({Users}) {
    this.belongsTo(Users,{foreignKey:'user_id',as: 'userAccount'})
    }
  }
  Inforemation.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model:  'Users',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Inforemation',
  });
  return Inforemation;
};