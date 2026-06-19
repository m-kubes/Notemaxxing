const { json } = require('express')
const Note = require('../models/Note')


const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)
    } catch (err) {
        console.error('Error in getAllNotes:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json(note);
    } catch (err) {
        console.error('Error in getNote:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const addNewNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});

        const savedNote = await newNote.save()
        res.status(201).json(savedNote)
    } catch (err) {
        console.error('Error in addNewNote:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const updateNote = async (req, res) => {
    try {
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                returnDocument: 'after'
            }
        );

        if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json(updatedNote);
    } catch (err) {
        console.error('Error in updateNote:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        console.error('Error in deleteNote:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}


module.exports = {
    getAllNotes,
    getNote,
    addNewNote,
    updateNote,
    deleteNote
}