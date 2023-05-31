const withAuth = require("../../utils/auth");
const { Role } = require("../../models");

const router = require("express").Router();

router.get("/roles", withAuth, async (req, res) => {
  res.render("roles");
});

router.post("/roles", withAuth, async (req, res) => {
  try {
    // Extract form data
    const { title, salary, department } = req.body;

    // Create a new role using Sequelize's create method
    await Role.create({
      title,
      salary,
      department,
    });

    // Redirect to roles page
    res.redirect("/roles");
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("An error occurred while creating a new role.");
  }
});

// Update a role
router.put("/roles/:id", withAuth, async (req, res) => {
  try {
    const roleId = req.params.id; // Extract the role ID from the request parameters
    const { title, salary, department } = req.body; // Extract updated role data from the request body

    // Find the role by ID
    const role = await Role.findByPk(roleId);

    // If the role doesn't exist, return an error response
    if (!role) {
      return res.status(404).send("Role not found");
    }

    // Update the role's properties
    role.title = title;
    role.salary = salary;
    role.department = department;

    // Save the updated role to the database
    await role.save();

    // Redirect to roles page or send a success response
    res.redirect("/roles");
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("An error occurred while updating the role.");
  }
});

// Delete a role
router.delete("/roles/:id", withAuth, async (req, res) => {
  try {
    const roleId = req.params.id; // Extract the role ID from the request parameters

    // Find the role by ID
    const role = await Role.findByPk(roleId);

    // If the role doesn't exist, return an error response
    if (!role) {
      return res.status(404).send("Role not found");
    }

    // Delete the role from the database
    await role.destroy();

    // Redirect to roles page or send a success response
    res.redirect("/roles");
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("An error occurred while deleting the role.");
  }
});
module.exports = router;
