const router = require("express").Router();
const poRouter = require('./po');
// const ap3Router = require('./ap3');
// const ibRouter = require('./ib');
const pvRouter = require('./pv');
const rvRouter = require('./rv');

// router.use('/ap3', ap3Router);
// router.use('/ib', ibRouter);
router.use('/po', poRouter);
router.use('/pv', pvRouter);
router.use('/rv', rvRouter);

module.exports = router;