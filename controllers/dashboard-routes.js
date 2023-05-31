const withAuth = require("../utils/auth");
const router = require("express").Router();
const db = require("../models");

router.get("/", withAuth, async (req, res) => {
  try {
    const employees = await db.employee.findAll({
      include: [db.role], // Include the 'role' model in the query
    });

    res.render("dashboard", { employees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
