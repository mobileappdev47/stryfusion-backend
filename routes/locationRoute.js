const express = require('express');
const { createLocation, getLocations, updateLocation, deleteLocation } = require('../controllers/locationCtrl');

const router = express.Router();


router.post('/',  createLocation);
router.get('/', getLocations);
router.put('/update/:locationId', updateLocation);
router.delete('/delete/:locationId', deleteLocation)

module.exports = router;    