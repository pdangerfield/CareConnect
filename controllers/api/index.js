const router = require("express").Router();

const userRoutes = require("./user-routes");
const departmentsRoutes = require("../department-routes.js");
const employeesRoutes = require("./employee-routes.js");
const rolesRoutes = require("./role-routes.js");

router.use("/departments", departmentsRoutes);
router.use("/employees", employeesRoutes);
router.use("/roles", rolesRoutes);
router.use("/users", userRoutes);

module.exports = router;
