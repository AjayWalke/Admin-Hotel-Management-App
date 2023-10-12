const express = require('express');
const { viewRoomNo, viewStartDate, viewAll} = require('../controller/getView');
const router = express.Router();


router.get('/room-no', viewRoomNo);
router.get('/start-end-date', viewStartDate);
router.get('/search-all', viewAll);

module.exports = router;