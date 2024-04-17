const express = require('express');
const { createUser, editUser, deleteUser, getUser, checkSlot } = require('../controller/getUser');
const router = express.Router();

router.post('/create-user', createUser);
router.post('/edit-user', editUser);
router.get('/get-user', getUser);
router.post('/delete-user', deleteUser);
// router.get('/checkSlot', checkSlot);

module.exports = router;