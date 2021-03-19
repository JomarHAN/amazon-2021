import dotenv from 'dotenv'
dotenv.config()

const configSecret = {
    mongo_url: process.env.MONGO_URL,
    jwt_secret: process.env.JWT_SECRET,
    paypal_client_id: process.env.PAYPAL_CLIENT_ID,
    access_key_id: process.env.ACCESS_KEY_ID,
    secret_access_key: process.env.SECRET_ACCESS_KEY,
    google_api_key: process.env.GOOGLE_API_KEY
}

export default configSecret;