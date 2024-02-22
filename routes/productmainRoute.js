const express = require('express');
const { createProductMain, getProductMain, updateProductMain, deleteProductMain } = require('../controllers/productmainCtrl');

const router = express.Router();


router.post('/', createProductMain);
router.get('/', getProductMain);
router.put('/update/:productId', updateProductMain);
router.delete('/delete/:productId', deleteProductMain)


module.exports = router;    