import dotenv from 'dotenv'
dotenv.config()

const configSecret = {
    mongo_url: process.env.MONGO_URL,
    jwt_secret: process.env.JWT_SECRET
}

export default configSecret;