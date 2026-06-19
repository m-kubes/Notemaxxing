const express = require('express');
const notesController = require('../controllers/notesController')

const router = express.Router();

router.get('/', notesController.getAllNotes)
router.get('/:id', notesController.getNote)
router.post('/', notesController.addNewNote)
router.put('/:id', notesController.updateNote)
router.delete('/:id', notesController.deleteNote)

module.exports = router;