const express = require('express')
const router = express.Router()

const user = require("./user/index");
const appDetail = require("./appDetail/index");

router.use('/user', user);
router.use('/appDetail', appDetail);
router.use("/", (req, res) => {
    res.json("Tracking API Server")
})

module.exports = router;
