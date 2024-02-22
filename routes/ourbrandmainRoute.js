const express = require('express');
const { createBrandMain, getBrandsMain, updateBrandMain, deleteBrandMain } = require('../controllers/ourbrandmainCtrl');

const router = express.Router();


router.post('/', createBrandMain);
router.get('/', getBrandsMain);
router.put('/update/:brandId', updateBrandMain);
router.delete('/delete/:brandId',deleteBrandMain)

module.exports = router;    