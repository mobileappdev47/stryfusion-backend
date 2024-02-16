const express = require('express');
const { upload, createProcess, getProcess, updateProcess, deleteProcess } = require('../controllers/processCtrl');

const router = express.Router();


router.post('/', upload.array('image'), createProcess);
router.get('/', getProcess);
router.post('/update/:processId/:cardId', upload.single('image'), updateProcess);
router.delete('/delete/:id', deleteProcess)

module.exports = router;    