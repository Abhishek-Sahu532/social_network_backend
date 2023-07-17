const cloudinary =require('cloudinary');

require('dotenv').config({path:'./config/.env'})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API,
    api_secret : process.env.API_SECRET
})



module.exports = cloudinary