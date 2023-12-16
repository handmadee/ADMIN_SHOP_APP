'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      detail: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      count: {
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
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Category',
          key:'id'
          
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Product');
  }
};