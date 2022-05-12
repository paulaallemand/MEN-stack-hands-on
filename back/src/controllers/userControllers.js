const UserSchema = require("../models/userSchema")
const bcrypt = require("bcrypt")

const getAll = async (req, res) => {      
    UserSchema.find(function (err, users) {
      if(err) {
        res.status(500).send({ message: err.message })
      }
        res.status(200).send(users)
    }) 
}

const getUserById = async (req, res) => {
    try {
        const userFound = await UserSchema.findById(req.params.id);
        if (userFound) {
        res.status(200).json({
            message: `The "${userFound.name}" user not found:`,
            userFound,
        });
        }
    } catch (e) {
        res.status(500).json({
        message: `This user couldn't be found. Please check if the id exists or try again later! ${e.message}`,
        });
    }
}

const createUser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    try {
        const newUser = new UserSchema(req.body)

        const savedUser = await newUser.save()

        res.status(200).json({
            message: "User adicionado com sucesso!",
            savedUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateUserById = async (req, res) => {
    try {
        const findUser = await UserSchema.findById(req.params.id)

        if (findUser) {            
            findUser.name = req.body.name || findUser.name
            findUser.email = req.body.email || findUser.email
        }

        const savedUser = await findUser.save()

        res.status(200).json({
            message: "Usuário atualizada com sucesso!",
            savedUser
        })

    } catch (error) {
        console.error(error)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const userFound = await UserSchema.findById(req.params.id)

       await userFound.delete()

       res.status(200).json({
           mensagem: `Usuário '${userFound.email}' deletada com sucesso!`
       })

    } catch (err) {
        res.status(400).json({
            mensagem: err.message
        })
    }
} 

module.exports = {
    getAll,
    getUserById,
    createUser,
    updateUserById, 
    deleteUserById
}