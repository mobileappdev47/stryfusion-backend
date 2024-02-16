const express = require('express');
const { upload, createOurBrand, updateOurBrands, getOurBrands, deleteOurBrands } = require('../controllers/ourBrandCtrl');

const router = express.Router();


router.post('/', upload.array('images'), createOurBrand);
router.get('/', getOurBrands);
router.put('/update/:id',upload.array('images'), updateOurBrands);
router.delete('/delete/:id', deleteOurBrands)

module.exports = router;    