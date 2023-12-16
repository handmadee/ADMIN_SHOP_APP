'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detailOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      countProduct: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      idOrder: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key:'id'
        }
      },
      idProduct: {
        allowNull:'false',
        type: Sequelize.INTEGER,
        references:{
          model: 'Product',
          key:'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detailOrders');
  }
};