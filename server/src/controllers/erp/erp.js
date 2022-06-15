const router = require("express").Router();
const ap3Router = require('./ap3');
const ibRouter = require('./ib');

router.use('/ap3', ap3Router);
router.use('/ib', ibRouter);

module.exports = router;