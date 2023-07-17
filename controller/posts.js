const cloudinary = require('cloudinary');





module.exports ={
    createPost : async (req, res)=>{
        try { //uploding the picture in cloudinary using multer while creating new post
const result = await cloudinary.uploader.upload(req.file.path);
await Post.create({
    title: req.body.title,
    image: result.secure_url,
    cloudinaryId: result.public_id
})
            
        } catch (err) {
            console.log(err)
            re
        }
    },
    deletePost: async (req,res)=>{
        try{
            let post = await Post.findById(req.params.id);
            await cloudinary.uploader.destroy(post.cloudinaryId)
        }catch(e){
console.log(e)
        }
    }
}