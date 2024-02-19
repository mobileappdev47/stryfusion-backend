const express = require('express');
const { createLocation, getLocations, updateLocation, deleteLocation, createContact, getContact, updateContact, deleteContact, contactFormSubmit } = require('../controllers/contactCtrl');

const router = express.Router();


router.post('/',  createContact);
router.get('/', getContact);
router.put('/update', updateContact);
router.delete('/delete', deleteContact)
router.post('/send', contactFormSubmit)

module.exports = router;    