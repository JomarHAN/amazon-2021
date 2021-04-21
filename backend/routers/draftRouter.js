import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Draft from '../models/draftModel.js'
import { isAuth, isSellerOrAdmin } from '../utils.js'

const draftRouter = express.Router()

draftRouter.get('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const draft = await Draft.findById(req.params.id).populate("seller", "seller.business seller.rating seller.numReviews")
    if (draft) {
        res.send(draft)
    } else {
        res.status(404).send({ message: "draft Not Found" })
    }
}))

draftRouter.put('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const draft = await Draft.findById(req.params.id)
    if (draft) {
        draft.name = req.body.name
        draft.imageAlbum = {
            image1: req.body.imageAlbum.image1,
            image2: req.body.imageAlbum.image2,
            image3: req.body.imageAlbum.image3,
            image4: req.body.imageAlbum.image4,
        }
        draft.price = req.body.price
        draft.category = req.body.category
        draft.brand = req.body.brand
        draft.countInStock = req.body.countInStock
        draft.rating = req.body.rating
        draft.numReviews = req.body.numReviews
        draft.description = req.body.description
        draft.fields = req.body.fields
        draft.seller = req.user._id
        const newDraft = await draft.save()
        res.send(newDraft)
    } else {
        res.status(404).send({ message: "Draft Not Found" })
    }
}))

draftRouter.post('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const draft = new Draft({
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
        description: "sample description",
        fields: "sample fields",
        seller: req.user._id
    })
    const newDraft = await draft.save()
    res.send(newDraft)
}))

draftRouter.get('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller
    const filterSeller = seller ? { seller: seller } : {}
    const drafts = await Draft.find({ ...filterSeller }).populate('seller', 'name')
    if (drafts) {
        res.send(drafts)
    } else {
        res.status(404).send({ message: "No Drafts Found" })
    }
}))

draftRouter.delete('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const draft = await Draft.findById(req.params.id)
    if (draft) {
        const draftRemove = await draft.remove()
        res.send(draftRemove)
    }
}))

export default draftRouter;