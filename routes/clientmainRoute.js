const express = require('express');
const { createClientMain, getClientMain, updateClientMain, deleteClientMain } = require('../controllers/clientmainCtrl');

const router = express.Router();


router.post('/', createClientMain);
router.get('/', getClientMain);
router.put('/update/:clientId', updateClientMain);
router.delete('/delete/:clientId', deleteClientMain)


module.exports = router;    