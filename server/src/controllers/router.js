const router = require("express").Router();
const permit = require("../middlewares/authorization");
const userRoles = require('../utils/userRoles');
const adminRouter = require('./admin');
const employeeRouter = require('./employee');
const authRouter = require('./auth');
const erpRouter = require('./erp');
const inspectorRouter = require('./inspector');

router.use('/admin', permit(userRoles.ADMIN), adminRouter);
router.use('/employee', employeeRouter);
router.use('/auth', authRouter);
router.use('/erp', permit(userRoles.ALL), erpRouter);
router.use('/inspector', permit(userRoles.INSPECTOR), inspectorRouter);
module.exports = router;