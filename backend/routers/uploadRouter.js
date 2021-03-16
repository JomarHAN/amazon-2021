import express from 'express'
import multer from 'multer'
import { isAuth } from '../utils.js'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import config from '../config.js'

const uploadRouter = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`)
    }
})

const upload = multer({ storage })

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

aws.config.update({
    accessKeyId: config.access_key_id,
    secretAccessKey: config.secret_access_key
})

const s3 = new aws.S3()
const storageS3 = multerS3({
    s3,
    bucket: 'amazon-jmn-2021',
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadS3 = multer({ storage: storageS3 })

uploadRouter.post('/s3', uploadS3.single('image'), (req, res) => {
    res.send(req.file.location)
})

export default uploadRouter;