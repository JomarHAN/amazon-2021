import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Draft from '../models/draftModel.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router()

productRouter.get('/top-sell', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ 'rating': -1 }).limit(3)
    res.send(products)
}))

productRouter.get('/seed', async (req, res) => {
    const createSample = await Product.insertMany(data.products)
    res.send({ createSample })
})


productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller
    const sellerFilter = seller ? { seller } : {}
    const fields = req.query.fields
    const fieldsFilter = fields ? { fields: { $regex: fields, $options: 'i' } } : {}
    const name = req.query.name
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {}
    const category = req.query.category
    const categoryFilter = category ? { category: { $regex: category, $options: 'i' } } : {}
    const min = Number(req.query.min)
    const max = Number(req.query.max)
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {}
    const rating = Number(req.query.rating)
    const ratingFilter = rating ? { rating: { $gte: rating } } : {}
    const order = req.query.order
    const orderFilter = order === "lowest" ? { price: 1 } : order === "highest" ? { price: -1 } : order === "toprated" ? { rating: -1 } : { _id: -1 }
    const products = await Product.find({
        ...sellerFilter,
        ...fieldsFilter,
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter
    }).populate('seller', 'seller.business seller.logo')
        .sort(orderFilter)
    res.send(products)
}))

productRouter.put('/:id/review', isAuth, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        if (product.reviews.find(x => x.userId === req.user._id)) {
            return res.status(400).send({ message: "You already submitted a review!" })
        }
        const review = {
            userName: req.user.name,
            userId: req.user._id,
            comment: req.body.comment,
            rating: Number(req.body.rating)
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((a, b) => a + b.rating, 0) / product.reviews.length
        const updateProduct = await product.save()
        res.send({
            message: "Review Created",
            review: updateProduct.reviews[updateProduct.reviews.length - 1]
        })
    } else {
        res.status(404).send({ message: "Product Not Found" })
    }
}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate("seller", "seller.business seller.rating seller.numReviews")
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "Product Not Found" })
    }
}))



productRouter.post('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: req.body.name,
        imageAlbum: {
            image1: req.body.imageAlbum.image1,
            image2: req.body.imageAlbum.image2,
            image3: req.body.imageAlbum.image3,
            image4: req.body.imageAlbum.image4,
        },
        price: Number(req.body.price),
        category: req.body.category,
        brand: req.body.brand,
        countInStock: Number(req.body.countInStock),
        rating: Number(req.body.rating),
        numReviews: Number(req.body.numReviews),
        description: req.body.description,
        fields: req.body.fields,
        seller: req.user._id
    })
    const createProduct = await product.save()
    res.send({ product: createProduct })
}))


productRouter.put('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
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

productRouter.delete('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        const productDelete = await product.remove()
        res.send({ message: `Product ${req.params.id} was deleted`, product: productDelete })
    } else {
        res.status(404).send({ message: "Product Not Found" })
    }
}))

export default productRouter;