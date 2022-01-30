const express = require('express');
const blogController = require('../controller/blogController');
const imageController = require('../controller/imageController');

const router = express.Router();

router.post('/', imageController.multerStream, blogController.createBlog);
router.get('/', blogController.allBlogs);
router.get('/:slug', blogController.getBlog);

module.exports = router;
