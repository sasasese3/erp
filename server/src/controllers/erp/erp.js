const router = require("express").Router();
const ap3Router = require('./ap3');

router.use('/ap3', ap3Router);

module.exports = router;