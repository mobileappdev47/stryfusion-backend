const express = require('express');
const { upload, createClient, getAllClients, updateClient, deleteClient } = require('../controllers/clientCtrl');

const router = express.Router();


router.post('/', upload.single("image"), createClient);
router.get('/', getAllClients);
router.put('/update/:clientId', upload.single("image"), updateClient);
router.delete('/delete/:clientId', deleteClient)


module.exports = router;    