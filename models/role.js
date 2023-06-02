const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class role extends Model { }

role.init (
    {
        id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
        },
        title: {
                    type: DataTypes.STRING,
                    allowNull: false,
        },
        salary: {
                    type: DataTypes.DECIMAL(10,2),
                    allowNull: false,
                    validate: {
                        isNumeric: true,
                    },
                },
        department_id: {
                            type: DataTypes.INTEGER,
                            allowNull: false, 
                            references: {
                            model: 'department',
                            key: 'id',
                            }  
                        },
    },
    {
        sequelize,
        freezeTableNAme: true,
        underscored: true,
        modelName: 'role'
    }
);

module.exports = role;