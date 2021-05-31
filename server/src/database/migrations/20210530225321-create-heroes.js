'use strict'

const { DataTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {

     return queryInterface.createTable('heroes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      hero_id: {
        type: Sequelize.STRING,
        allowNull: false
      }, 
      name: {
        type: Sequelize.STRING,
      }, 
      extension: {
        type: Sequelize.STRING,
        allowNull: false
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
     })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('heroes')

  }
};
