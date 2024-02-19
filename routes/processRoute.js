const express = require('express');
const { upload, createProcess, getProcess, updateProcess, deleteProcess } = require('../controllers/processCtrl');

const router = express.Router();


router.post('/', upload.single("image"), createProcess);
router.get('/', getProcess);
router.put('/update/:processId', upload.single('image'), updateProcess);
router.delete('/delete/:processId', deleteProcess)

module.exports = router;    