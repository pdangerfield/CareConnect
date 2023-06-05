const { department } = require("../../models");
const router = require("express").Router();

// Get all departments and render the "departments" view template
router.get("/", async (req, res) => {
  try {
    const departmentData = await department.findAll();
    const departments = departmentData.map((department) =>
      department.get({ plain: true })
    );
    res.render("departments", { departments });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving departments.");
  }
});

// Get a single department
router.get("/:id", async (req, res) => {
  try {
    const departmentId = req.params.id;
    const selectedDepartment = await department.findByPk(departmentId);

    // Handle the retrieved department data (e.g., send it as a response)
    res.render("departments", { departments: [selectedDepartment] });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the department.");
  }
});

// Add a department
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    await department.create({ name });

    res.redirect("/api/departments");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding a new department.");
  }
});

// Update a department
router.put("/:id", async (req, res) => {
  try {
    const departmentId = req.params.id;
    const { name } = req.body;

    const updatedDepartment = await department.findByPk(departmentId);

    if (!updatedDepartment) {
      return res.status(404).send("Department not found");
    }

    updatedDepartment.name = name;
    await updatedDepartment.save();

    res.redirect("/api/departments");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the department.");
  }
});

// Delete a department
router.delete("/:id", async (req, res) => {
  try {
    const departmentId = req.params.id;

    const deletedDepartment = await department.findByPk(departmentId);

    if (!deletedDepartment) {
      return res.status(404).send("Department not found");
    }

    await deletedDepartment.destroy();

    res.redirect("/api/departments");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the department.");
  }
});

module.exports = router;
