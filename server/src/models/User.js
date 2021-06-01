const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'email cannot be null'
                    },
                    isEmail: true,
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
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Password cannot be null'
                    }
                }
            }
        },
            {
                sequelize
            })
    }
    static associate(models) {
        this.belongsToMany(models.Hero, {foreignKey: 'user_id', through: 'user_heroes', as: 'heroes'})
        this.belongsToMany(models.Comic, {foreignKey: 'user_id', through: 'user_comics', as: 'comics'})
    }
}


module.exports = User