const router = require("express").Router();
const permit = require("../middlewares/authorization");
const userRoles = require('../utils/userRoles');
const adminRouter = require('./admin');
const employeeRouter = require('./employee');
const authRouter = require('./auth');
// const erpRouter = require('./erp/erp');

router.use('/admin', permit(userRoles.ADMIN), adminRouter);
router.use('/employee', employeeRouter);
router.use('/auth', authRouter);
// router.use('/erp', erpRouter);

module.exports = router;