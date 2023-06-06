const router = require("express").Router();

const apiRoutes = require("./api");
const dashboardRoutes = require("./homeRoutes.js");

router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
