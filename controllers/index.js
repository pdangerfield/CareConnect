const router = require("express").Router();

const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboard-routes.js");

router.use("/dasboard", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;