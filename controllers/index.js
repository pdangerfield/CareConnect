const router = require("express").Router();

const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboard-routes.js");
const homeRoutes = require("./homeRoutes.js");
const departmentRoutes = require("./department-routes.js");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
router.use("/department", departmentRoutes);


module.exports = router;
