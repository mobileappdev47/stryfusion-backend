const express = require('express');
const { createProcessMain, getProcessMain, updateProcessMain, deleteProcessMain } = require('../controllers/processmainCtrl');

const router = express.Router();


router.post('/', createProcessMain);
router.get('/', getProcessMain);
router.put('/update/:processId', updateProcessMain);
router.delete('/delete/:processId', deleteProcessMain)

module.exports = router;    