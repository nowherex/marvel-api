const { Model, DataTypes } = require('sequelize')

class Comic extends Model {
    static init(sequelize) {
        super.init({
            comic_id: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Comic_id cannot be null'
                    }
                }
            },
            title: {
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
                tableName: 'comics'
            })
    }
    static associate(models) {
        this.belongsToMany(models.User, {foreignKey: 'comic_id', through: 'user_comics', as: 'users'})
    }
}


module.exports = Comic