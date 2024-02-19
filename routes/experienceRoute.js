const express = require('express');
const { upload, createExperience, getAllExperiences, updateExperience, deleteExperience } = require('../controllers/experienceCtrl');

const router = express.Router();


router.post('/', upload.single("image"), createExperience);
router.get('/', getAllExperiences);
router.put('/update/:experienceId', upload.single("image"), updateExperience);
router.delete('/delete/:experienceId', deleteExperience)


module.exports = router;    