const router = require("express").Router();
const ap3Router = require('./ap3');
const ibRouter = require('./ib');
const poRouter = require('./po');

router.use('/ap3', ap3Router);
router.use('/ib', ibRouter);
router.use('/po', poRouter);

module.exports = router;