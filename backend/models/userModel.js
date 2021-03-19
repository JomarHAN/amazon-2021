import mongoose from 'mongoose'

const buyerReview = new mongoose.Schema({
    buyerName: { type: String, required: true },
    buyerId: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true }
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    seller: {
        business: String,
        logo: String,
        description: String,
        rating: { type: Number, default: 0, required: true },
        numReviews: { type: Number, default: 0, required: true },
        reviews: [buyerReview]
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
export default User;