const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const User = require('../models/User')
const Hero = require('../models/Hero')
const Comic = require('../models/Comic')


const connection = new Sequelize(dbConfig)

User.init(connection)
Hero.init(connection)
Comic.init(connection)

User.associate(connection.models)
Hero.associate(connection.models)
Comic.associate(connection.models)

module.exports = connection