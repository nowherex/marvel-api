'use strict'

const { DataTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {

     return queryInterface.createTable('comics', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      comic_id: {
        type: Sequelize.STRING,
        allowNull: false
      }, 
      title: {
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
    return queryInterface.dropTable('comics')

  }
};
