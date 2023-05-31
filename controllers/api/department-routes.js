const withAuth = require("../../utils/auth");
const { Department } = require("../../models");

const router = require("express").Router();

router.get("/departments", withAuth, async (req, res) => {
  // Retrieve all departments from the database
  const departments = await Department.findAll();

  res.render("departments", { departments });
});

// Add a department
router.post("/departments", withAuth, async (req, res) => {
  try {
    // Extract form data
    const { name } = req.body;

    // Create a new department using Sequelize's create method
    await Department.create({
      name,
    });

    // Redirect to departments page
    res.redirect("/departments");
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("An error occurred while adding a new department.");
  }
});

// Update a department
router.put("/departments/:id", withAuth, async (req, res) => {
  try {
    const departmentId = req.params.id; // Extract the department ID from the request parameters
    const { name } = req.body; // Extract updated department data from the request body

    // Find the department by ID
    const department = await Department.findByPk(departmentId);

    // If the department doesn't exist, return an error response
    if (!department) {
      return res.status(404).send("Department not found");
    }

    // Update the department's properties
    department.name = name;

    // Save the updated department to the database
    await department.save();

    // Redirect to departments page or send a success response
    res.redirect("/departments");
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("An error occurred while updating the department.");
  }
});

// Delete a department
router.delete("/departments/:id", withAuth, async (req, res) => {
  try {
    const departmentId = req.params.id; // Extract the department ID from the request parameters

    // Find the department by ID
    const department = await Department.findByPk(departmentId);

    // If the department doesn't exist, return an error response
    if (!department) {
      return res.status(404).send("Department not found");
    }

    // Delete the department from the database
    await department.destroy();

    // Redirect to departments page or send a success response
    res.redirect("/departments");
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("An error occurred while deleting the department.");
  }
});

module.exports = router;
