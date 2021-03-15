import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router()

productRouter.get('/seed', async (req, res) => {
    const createSample = await Product.insertMany(data.products)
    res.send({ createSample })
})

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: Date.now(),
        image: "/images/p1.jpg",
        price: 0,
        category: "sample category",
        brand: "sample brand",
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: "sample description"
    })
    const createProduct = await product.save()
    res.send({ product: createProduct })
}))

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.send(products)
}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "Product Not Found" })
    }
}))


export default productRouter;