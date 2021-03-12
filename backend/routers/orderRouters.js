import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router()

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (req.body.cartItems.length === 0) {
        res.status(400).send({ message: "Cart Empty" })
    } else {
        const order = new Order({
            orderItems: req.body.cartItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        })
        const createdOrder = await order.save()
        res.send({ message: "New Order Created", order: createdOrder })
    }
}))

export default orderRouter;