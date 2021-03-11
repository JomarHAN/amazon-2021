import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { generateToken } from '../utils.js';

const userRouter = express.Router()

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createUsers = await User.insertMany(data.users)
    res.send({ createUsers })
}))

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email.toLowerCase() })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const userSignin = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            }
            res.send(userSignin)
        } else {
            return res.status(404).send({ message: "Invalid Email Or Password" })
        }
    } else {
        res.status(404).send({ message: "Invalid Email Or Password" })
    }
}))

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const userExist = await User.findOne({ email: req.body.email.toLowerCase() })
    if (!userExist) {
        const user = new User({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: bcrypt.hashSync(req.body.password, 8)
        })
        const newUser = await user.save()
        res.send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser)
        })
    } else {
        return res.status(409).send({ message: "Email is already registered. Try Another Email!" })
    }
}))

export default userRouter;