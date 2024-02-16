const express = require('express');
const { upload, createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productCtrl');

const router = express.Router();


router.post('/', upload.array("products", 10), createProduct);
router.get('/', getProduct);
router.put('/update/:id', upload.single("products[0][productImage]"), updateProduct);
router.delete('/delete/:id', deleteProduct)


module.exports = router;    