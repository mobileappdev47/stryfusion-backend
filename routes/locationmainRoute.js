const express = require('express');
const { createLocationMain, getLocationMain, updateLocationMain, deleteLocationMain } = require('../controllers/locationmainCtrl');

const router = express.Router();


router.post('/', createLocationMain);
router.get('/', getLocationMain);
router.put('/update/:locationId', updateLocationMain);
router.delete('/delete/:locationId', deleteLocationMain)

module.exports = router;    