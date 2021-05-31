const { Model, DataTypes } = require('sequelize')

class Hero extends Model {
    static init(sequelize) {
        super.init({
            hero_id: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Hero_id cannot be null'
                    }
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Name cannot be null'
                    }
                }
            },
            extension: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'extension cannot be null'
                    }
                }
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'path cannot be null'
                    }
                }
            },
        },
            {
                sequelize,
                tableName: 'heroes'
            })
    }
    static associate(models) {
        this.belongsToMany(models.User, {foreignKey: 'hero_id', through: 'user_heroes', as: 'users'})
    }
}


module.exports = Hero