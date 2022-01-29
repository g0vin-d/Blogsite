const Blogpost = require('../models/blogpost');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createBlog = catchAsync(async (req, res, next) => {
  const { title, description, markdown } = req.body;

  const blog = await Blogpost.create({ title, description, markdown });

  res.status(200).json({
    status: 'success',
    blog,
  });
});

exports.allBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blogpost.find().sort({
    postedAt: 'desc',
  });

  res.status(200).json({
    status: 'success',
    blogs,
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blogpost.findOne({ slug: req.params.slug });

  if (!blog) {
    return next(new AppError('No blog found with that slug', 404));
  }

  res.status(200).json({
    status: 'success',
    blog,
  });
});
