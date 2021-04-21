import mongoose from 'mongoose'

const review = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true }
}, {
    timestamps: true
})

const productSchema = new mongoose.Schema({
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
    reviews: [review],
    isDisount: { type: Boolean, default: false, required: true },
    discountPrice: { type: Number }
})
const Product = mongoose.model("Product", productSchema)
export default Product;