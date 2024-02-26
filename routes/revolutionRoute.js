const express = require('express');
const { createRevolution, getRevolution, updateRevolution, deleteRevolution } = require('../controllers/revolutionCtrl');

const router = express.Router();


router.post('/', createRevolution);
router.get('/', getRevolution);
router.put('/update/:revolutionId', updateRevolution);
router.delete('/delete/:revolutionId', deleteRevolution)


module.exports = router;    