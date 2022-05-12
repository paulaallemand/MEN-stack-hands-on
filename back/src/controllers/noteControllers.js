const NoteSchema = require('../models/noteSchema')
const UserSchema = require("../models/userSchema")
const mongoose = require('mongoose')

const getAll = async (req, res) => {
    try {
        const notes = await NoteSchema.find()
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

const getNoteById = async (req, res) => {
    try {
        const noteFound = await NoteSchema.findById(req.params.id);
        if (noteFound) {
        res.status(200).json({
            message: `The "${noteFound.name}" note not found:`,
            noteFound,
        });
        }
    } catch (e) {
        res.status(500).json({
        message: `This note couldn't be found. Please check if the id exists or try again later! ${e.message}`,
        });
    }
};

// criar método para cadastrar uma nota 
const createNote = async (req, res) => {
    try {
        const newNote = new NoteSchema({
            author: req.body.author,
            title: req.body.title,
            _id: new mongoose.Types.ObjectId()
        })

        const savedNote = await newNote.save()
        res.status(200).json({
            message: "Nota adicionada com sucesso! (:",
            savedNote
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// criar método para atualizar informações de uma nota
const updateNoteById = async (req, res) => {
    try {
        const findNote = await NoteSchema.findById(req.params.id)
        console.log(findNote)

        if (findNote) {            
            findNote.author = req.body.author || findNote.author
            findNote.title = req.body.title || findNote.title
        }

        const savedNote = await findNote.save()
        console.log('APÓS ATUALIZAÇÃO', savedNote)

        res.status(200).json({
            message: "Nota atualizada com sucesso!!!!",
            savedNote
        })

    } catch (error) {
        
    }
}

const deleteNoteById = async (req, res) => {
    try {
        const noteFound = await NoteSchema.findById(req.params.id)

       await noteFound.delete()

       res.status(200).json({
           mensagem: `Nota '${noteFound.title}' deletada com sucesso!`
       })

    } catch (err) {
        res.status(400).json({
            mensagem: err.message
        })
    }
}

module.exports = {
    getAll,
    getNoteById,
    createNote,
    updateNoteById, 
    deleteNoteById
}