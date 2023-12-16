'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,detailOrders}) {  
      this.belongsTo(Users, {foreignKey:'idUser'})
      this.hasMany(detailOrders, {foreignKey:'idOrder'})
    }
  }
  Order.init({
    shop:{ 
     type:  DataTypes.STRING,
     defaultValue:'SHOP DUNK'
    },
    status:{ 
      type:  DataTypes.STRING,
      defaultValue:0,
     },
    idUser: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
         model: 'Users',
         key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Order;
};

// Image defaul 
// Garavata 
