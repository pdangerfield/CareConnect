const withAuth = require("../../utils/auth");
const { role } = require("../../models");

const router = require("express").Router();

// Get all roles from the database and serialize them
router.get("/", withAuth, async (req, res) => {
  try {
    const roleData = await role.findAll();
    const roles = roleData.map((role) => role.get({ plain: true }));
    res.render("roles", { roles });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving roles.");
  }
});

// Get a single role
router.get("/:id", withAuth, async (req, res) => {
  try {
    const roleId = req.params.id;
    const selectedRole = await role.findByPk(roleId);

    // Handle the retrieved role data (e.g., send it as a response)
    res.render("roles", { selectedRole });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the role.");
  }
});

// Create a new role
router.post("/", withAuth, async (req, res) => {
  try {

    const { title, salary, department } = req.body;

    // Create a new role using Sequelize's create method
    await role.create({
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
router.put("/:id", withAuth, async (req, res) => {
  try {
    // Extract the role ID from the request parameters and the updated role data from the request body
    const roleId = req.params.id;
    const { title, salary, department } = req.body;

    // Find the role by ID
    const updateRole = await role.findByPk(roleId);

    // If the role doesn't exist, return an error response
    if (!updateRole) {
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
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Extract the role ID from the request parameters
    const roleId = req.params.id;

    // Find the role by ID
    const deleteRole = await role.findByPk(roleId);

    // If the role doesn't exist, return an error response
    if (!deleteRole) {
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
