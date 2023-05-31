const withAuth = require("../utils/auth");

const router = require("express").Router();

router.get("/", withAuth, async (req, res) => {
  res.render("dashboard");
});

module.exports = router;
