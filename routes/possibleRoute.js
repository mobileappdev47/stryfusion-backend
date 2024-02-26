const express = require('express');
const { createPossible, getPossibles, updatePossible, deletePossible } = require('../controllers/possibleCtrl');

const router = express.Router();


router.post('/',  createPossible);
router.get('/', getPossibles);
router.put('/update/:possibleId', updatePossible);
router.delete('/delete/:possibleId', deletePossible)


module.exports = router;    