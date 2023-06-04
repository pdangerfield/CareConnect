const withAuth = require("../../utils/auth");
const { employee } = require("../../models");
const router = require("express").Router();

// Get all employees from the database and serialize them
router.get("/", async (req, res) => {
  try {
    const employeeData = await employee.findAll();
    const employees = employeeData.map((employee) =>
      employee.get({ plain: true })
    );
    res.render("employees", { employees });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving employees.");
  }
});

// Get a single employee
router.get("/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const selectedEmployee = await employee.findByPk(employeeId);

    // Handle the retrieved employee data (e.g., send it as a response)
    res.render("employees", { selectedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the employee.");
  }
});

// Add an employee
router.post("/", withAuth, async (req, res) => {
  try {
    // Extract form data
    const { first_name, last_name, role_id, manager_id } = req.body;

    // Create a new employee using Sequelize's create method
    await employee.create({
      first_name,
      last_name,
      role_id,
      manager_id,
    });
    res.redirect("/employees");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding a new employee.");
  }
});

// Update an employee
router.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the employee ID from the request parameters
    const { first_name, last_name, role_id, manager_id } = req.body; // Extract updated employee data from the request body

    // Find the employee by ID
    const employeeRecord = await employee.findByPk(id);

    // If the employee doesn't exist, return an error response
    if (!employeeRecord) {
      return res.status(404).send("Employee not found");
    }

    // Update the employee's properties
    employeeRecord.first_name = first_name;
    employeeRecord.last_name = last_name;
    employeeRecord.role_id = role_id;
    employeeRecord.manager_id = manager_id;

    // Save the updated employee to the database
    await employeeRecord.save();

    res.redirect("/employees");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the employee.");
  }
});

// Delete an employee
router.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the employee ID from the request parameters

    // Find the employee by ID
    const employeeRecord = await employee.findByPk(id);

    // If the employee doesn't exist, return an error response
    if (!employeeRecord) {
      return res.status(404).send("Employee not found");
    }

    // Delete the employee from the database
    await employeeRecord.destroy();

    // Redirect to employees page or send a success response
    res.redirect("/employees");
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("An error occurred while deleting the employee.");
  }
});

module.exports = router;
