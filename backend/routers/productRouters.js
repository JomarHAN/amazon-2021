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


productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller
    const sellerFilter = seller ? { seller } : {}
    const products = await Product.find({ ...sellerFilter }).populate('seller', 'seller.business seller.logo')
    res.send(products)
}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate("seller", "seller.business seller.rating seller.numReviews")
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "Product Not Found" })
    }
}))

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: Date.now(),
        imageAlbum: {
            image1: "/Images_Template/image-1.png",
            image2: "/Images_Template/image-2.png",
            image3: "/Images_Template/image-3.png",
            image4: "/Images_Template/image-4.png",
        },
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


productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.imageAlbum = {
            image1: req.body.imageAlbum.image1,
            image2: req.body.imageAlbum.image2,
            image3: req.body.imageAlbum.image3,
            image4: req.body.imageAlbum.image4,
        };
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const newProduct = await product.save();
        res.send({ message: "Product Created", product: newProduct });
    } else {
        res.status(404).send({ message: "Product Not Found" })
    }
}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        const productDelete = await product.remove()
        res.send({ message: `Product ${req.params.id} was deleted`, product: productDelete })
    } else {
        res.status(404).send({ message: "Product Not Found" })
    }
}))

export default productRouter;