const express = require("express")
const router = express.Router()

const controller = require("../controllers/userControllers")
const authController = require("../controllers/authControllers")

router.get("/all", authController.checkToken, controller.getAll)
router.post("/create", controller.createUser)
router.post('/login', authController.login)

router.get("/:id", controller.getUserById)
router.patch("/update/:id", controller.updateUserById)
router.delete("/delete/:id", controller.deleteUserById)

module.exports = router