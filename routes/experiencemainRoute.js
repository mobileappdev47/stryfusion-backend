const express = require('express');
const { updateExperienceMain, deleteExperienceMain, createExperienceMain, getExperienceMain } = require('../controllers/experiencemainCtrl');

const router = express.Router();


router.post('/', createExperienceMain);
router.get('/', getExperienceMain);
router.put('/update/:experienceId', updateExperienceMain);
router.delete('/delete/:experienceId', deleteExperienceMain)


module.exports = router;    