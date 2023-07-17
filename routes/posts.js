const router = require('express').Router();
const upload = require('../middleware/multer')
const postController = require('../controller/posts')



router.post('/createPost', upload.single('file', postController.createPost) )


module.exports = router