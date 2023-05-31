const withAuth = require("../utils/auth");

const router = require("express").Router();

router.get("/", withAuth async (req, res) => {
  res.render("homepage");
});

module.exports = router;
