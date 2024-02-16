const express = require('express');
const { createHome, upload, getHome, updateHome, deleteHome } = require('../controllers/homeCtrl');

const router = express.Router();


router.post('/', upload.array('images', 5), createHome);
router.get('/', getHome);
router.put('/update/:id',upload.array('images', 5), updateHome);
router.delete('/delete/:id', deleteHome)

module.exports = router;    