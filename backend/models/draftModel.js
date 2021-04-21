import mongoose from 'mongoose'

const DraftSchema = new mongoose.Schema({
    imageAlbum: {
        image1: { type: String, required: true },
        image2: { type: String, required: true },
        image3: { type: String, required: true },
        image4: { type: String, required: true },
    },
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fields: { type: String, required: true },
})

const Draft = mongoose.model('Draft', DraftSchema)
export default Draft;