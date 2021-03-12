import dotenv from 'dotenv'
dotenv.config()

const configSecret = {
    mongo_url: process.env.MONGO_URL,
    jwt_secret: process.env.JWT_SECRET,
    paypal_client_id: process.env.PAYPAL_CLIENT_ID
}

export default configSecret;