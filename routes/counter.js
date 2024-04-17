const express = require('express');
const counter = require('../controller/getCounter');
const router = express.Router();

router.get('/get-counter', counter);

module.exports = router;