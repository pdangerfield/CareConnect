const withAuth = require("../../utils/auth");
const { Employee } = require("../../models");

const router = require("express").Router();

router.get("/employees", withAuth, async (req, res) => {
  // Retrieve all employees from the database
  const employees = await Employee.findAll();

  res.render("employees", { employees });
});

// Add an employee
router.post("/employees", withAuth, async (req, res) => {
  try {
    // Extract form data
    const { first_name, last_name, role_id, manager_id } = req.body;

    // Create a new employee using Sequelize's create method
    await Employee.create({
      first_name,
      last_name,
      role_id,
      manager_id,
    });

    // Redirect to employees page
    res.redirect("/employees");
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("An error occurred while adding a new employee.");
  }
});

// Update an employee
router.put("/employees/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params; // Extract the employee ID from the request parameters
    const { first_name, last_name, role_id, manager_id } = req.body; // Extract updated employee data from the request body

    // Find the employee by ID
    const employee = await Employee.findByPk(id);

    // If the employee doesn't exist, return an error response
    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    // Update the employee's properties
    employee.first_name = first_name;
    employee.last_name = last_name;
    employee.role_id = role_id;
    employee.manager_id = manager_id;

    // Save the updated employee to the database
    await employee.save();

    // Redirect to employees page or send a success response
    res.redirect("/employees");
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("An error occurred while updating the employee.");
  }
});

// Delete an employee
router.delete("/employees/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params; // Extract the employee ID from the request parameters

    // Find the employee by ID
    const employee = await Employee.findByPk(id);

    // If the employee doesn't exist, return an error response
    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    // Delete the employee from the database
    await employee.destroy();

    // Redirect to employees page or send a success response
    res.redirect("/employees");
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("An error occurred while deleting the employee.");
  }
});

module.exports = router;
