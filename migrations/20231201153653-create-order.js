'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shop: {
        type: Sequelize.STRING
      },
      status:{ 
        type:  Sequelize.STRING,
       },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
           model: 'Users',
           key:'id'
        }
    }})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};