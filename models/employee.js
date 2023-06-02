const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class employee extends Model { }

employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
                        type: DataTypes.STRING,
                        allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'role',
                        key: 'id',
                    }  
        },
        manager_id: {
                        type: DataTypes.INTEGER,
                        allowNull: true,
                        references: {
                            model: 'employee',
                            key: 'id',
                        }  
        },
        
    },
    {
        sequelize,
        freezeTableNAme: true,
        underscored: true,
        modelName: 'employee,'
    }
);

module.exports = employee;