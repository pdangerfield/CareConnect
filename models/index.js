const User = require('./User');
const department = require('./department');
const role = require('./role');
const employee = require('./employee');

department.hasMany(role,
    {
       foreignKey: 'department_id'
    }
);
role.hasMany(employee,
    {
       foreignKey: 'role_id'
    }
);
role.belongsTo(department,
    {
        foreignKey: 'department_id'
    }
);
employee.belongsTo(role,
    {
        foreignKey: 'role_id'
    }
);


module.exports = { User, department, role, employee }; 