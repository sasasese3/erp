const router = require("express").Router();
const adminRouter = require('./admin');
const employeeRouter = require('./employee');
const authRouter = require('./auth');
const ap3Router = require('./ap3');

router.use('/admin', adminRouter);
router.use('/employee', employeeRouter);
router.use('/auth', authRouter);
router.use('/ap3', ap3Router);

module.exports = router;