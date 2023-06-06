const router = require("express").Router();

const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboard-routes.js");

router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving roles.");
  }
});

router.get("/", async (req, res) => {
    try {
      res.render("homepage");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while retrieving roles.");
    }
  });

router.get("/signup", async (req, res) => {
    try {
        res.render("signup");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while retrieving roles.");
    }
});

module.exports = router;
