'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Inforemation,Orders}) {
      // define association here
      // connect table các bảng lại với nhau 
      // 
      this.hasMany(Inforemation, {foreignKey: 'user_id',as: 'userAccount'});
      this.hasMany(Orders,{foreignKey:'idUser'})
    }
  }
  user.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      }
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'CLIENT'
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return user;
};