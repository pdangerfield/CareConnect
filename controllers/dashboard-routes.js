const router = require("express").Router();
const employee = require("../models/employee");
const role = require("../models/role");
const department = require("../models/department");

router.get('/', (req, res) => {
  employee.findAll({
    include: [{ model: role, include: [department] }]
  })
    .then((employees) => {
      const processedData = employees.map((employee) => {
        return {
          id: employee.id,
          first_name: employee.first_name,
          last_name: employee.last_name,
          role: employee.role.title,
          salary: employee.role.salary,
          department_id: employee.role.department.id,
          department_name: employee.role.department.department_name
        };
      });

      res.render('homepage', { processedData: JSON.stringify(processedData) });
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('An error occurred');
    });
});

module.exports = router;
