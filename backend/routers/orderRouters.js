import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router()

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name')
    if (orders) {
        res.send(orders)
    } else {
        res.status(404).send({ message: "No Order Found" })
    }
}))

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

orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.send(orders)
}))

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        res.send(order)
    } else {
        res.status(404).send({ message: "Order Not Found" })
    }
}))

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now(),
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }
        const orderUpdate = await order.save()
        res.send({ message: "Order Paid", order: orderUpdate })
    } else {
        res.status(404).send({ message: "Order Not Found" })
    }
}))

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        const orderDelete = await order.remove()
        res.send(orderDelete)
    } else {
        res.status(404).send({ message: `Order ${req.params.id} Not Found` })
    }
}))

export default orderRouter;