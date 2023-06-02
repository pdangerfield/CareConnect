const sequelize = require('../config/connection');
const { User, department, role, employee } = require('../models');

const userData = require('./UserData.json');
const departmentData = require('./departmentData.json');
const roleData = require('./roleData.json');
const employeeData = require('./employeeData.json');

const seedDatabase = async() => {
    await sequelize.sync({ force: true });

    console.log('\n----- DATABASE SYNCED -----\n');

    await  User.bulkcreate(userData);
    console.log('\n----- USERS SEEDED -----\n');

    await  User.bulkcreate(departmentData);
    console.log('\n----- department SEEDED -----\n');

    await User.bulkcreate(roleData);
    console.log('\n----- role SEEDED -----\n');

    await User.bulkcreate(employeeData);
    console.log('\n----- employee SEEDED -----\n');

    process.exit(0);
};

seedDatabase();