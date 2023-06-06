const router = require("express").Router();

const userRoutes = require("./userRoutes");
const departmentsRoutes = require("./departmentRoutes.js");
const employeesRoutes = require("./employeeRoutes.js");
const rolesRoutes = require("./roleRoutes.js");

router.use("/departments", departmentsRoutes);
router.use("/employees", employeesRoutes);
router.use("/roles", rolesRoutes);
router.use("/users", userRoutes);

module.exports = router;
