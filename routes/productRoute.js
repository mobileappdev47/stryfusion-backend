const express = require('express');
const { upload, createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productCtrl');

const router = express.Router();


router.post('/', upload.single("image"), createProduct);
router.get('/', getProduct);
router.put('/update/:productId', upload.single("image"), updateProduct);
router.delete('/delete/:productId', deleteProduct)


module.exports = router;    