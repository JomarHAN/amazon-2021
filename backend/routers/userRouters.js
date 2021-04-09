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

userRouter.put('/:id/review', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        if (`${user._id}` === `${req.user._id}`) {
            return res.status(400).send({ message: "You are not able to rate yourself!" })
        }
        if (user.seller.reviews.find(x => x.buyerId === req.user._id)) {
            return res.status(400).send({ message: "You have already reviewed!" })
        }
        const review = {
            buyerName: req.user.name,
            buyerId: req.user._id,
            comment: req.body.comment,
            rating: Number(req.body.rating)
        }
        user.seller.reviews.push(review)
        user.seller.numReviews = user.seller.reviews.length
        user.seller.rating = user.seller.reviews.reduce((a, c) => a + c.rating, 0) / user.seller.reviews.length
        const userUpdate = await user.save()
        res.send({ message: "Seller Reviewed", user: userUpdate })

    } else {
        res.status(404).send({ message: "User Not Found" })
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
        user.seller.logo = req.body.seller.logo;
        user.seller.description = req.body.seller.description;
        user.seller.business = req.body.seller.business;
        const updateUser = await user.save()
        res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            isSeller: user.isSeller,
            seller: user.seller,
            token: generateToken(updateUser)
        })
    }
}))

userRouter.delete('/delete/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        if (user.isAdmin) {
            res.status(401).send({ message: "Not able to delete admin account!" })
            return
        } else {
            const userDeleted = await user.remove()
            res.send({ message: `User ${req.params.id} was deleted successfully!`, user: userDeleted })
        }
    } else {
        res.status(404).send({ message: `User: ${req.params.id} was not found` })
    }
}))

userRouter.put('/update/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name
        user.email = req.body.email
        user.isSeller = req.body.isSeller
        user.isAdmin = req.body.isAdmin
        const userUpdate = await user.save()
        res.send({ message: "User updated successfully!", user: userUpdate })
    } else {
        res.status(404).send({ message: "User Not Found" })
    }
}))

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const users = await User.find({})
    res.send(users)
}))

export default userRouter;