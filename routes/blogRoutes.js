const express = require('express');
const blogController = require('../controller/blogController');

const router = express.Router();

router.post('/', blogController.createBlog);
router.get('/', blogController.allBlogs);
router.get('/:slug', blogController.getBlog);

module.exports = router;
