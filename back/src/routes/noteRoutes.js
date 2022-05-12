const express = require("express")
const router = express.Router()

const controller = require("../controllers/noteControllers")
const authController = require("../controllers/authControllers")

// DEMANDA: visualizar todas as notas cadastradas
router.get("/all", authController.checkToken, controller.getAll)

// DEMANDA: cadastrar nota
router.post("/create", controller.createNote)

router.get("/:id", controller.getNoteById)

// DEMANDA: atualizar uma nota
router.patch("/update/:id", controller.updateNoteById)

// DEMANDA: excluir uma nota
router.delete("/delete/:id", controller.deleteNoteById)

module.exports = router