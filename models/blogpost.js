const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const blogpostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A Blog must have a title'],
    trim: true,
    minlength: [5, 'A title must have characters more or equal than 5'],
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  markdown: {
    type: String,
    required: [true, 'A Blog must have content'],
  },
  markdownHtml: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
  },
});

blogpostSchema.pre('save', function (next) {
  // create slug for quering blogs
  this.slug = slugify(this.title, { lower: true, strict: true });

  // converting markdown to html with little bit of sanitization
  this.markdownHtml = dompurify.sanitize(marked.parse(this.markdown));

  next();
});

const Blogpost = mongoose.model('Blogpost', blogpostSchema);

module.exports = Blogpost;
