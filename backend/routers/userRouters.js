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
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const userSignin = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            }
            res.send({ message: "Sign-In Successfully", user: userSignin })
        } else {
            return res.status(404).send({ message: "Invalid Email Or Password" })
        }
    } else {
        res.status(404).send({ message: "Invalid Email Or Password" })
    }
}))

export default userRouter;