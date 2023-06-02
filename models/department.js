const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class department extends Model { }

department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        department_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },       
    },
    {
        sequelize,
        freezeTableNAme: true,
        underscored: true,
        modelName: 'department'
    }
);
module.exports = department;
