import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { generateToken, isAdmin, isAuth } from '../utils.js';

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
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
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
            isSeller: user.isSeller,
            token: generateToken(newUser)
        })
    } else {
        return res.status(409).send({ message: "Email is already registered. Try Another Email!" })
    }
}))

userRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.send(user)
    } else {
        res.status(404).send({ message: "User's Profile not Found" })
    }
}))

userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updateUser = await user.save()
        res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(updateUser)
        })
    }
}))

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const users = await User.find({})
    res.send(users)
}))

export default userRouter;