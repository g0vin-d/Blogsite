const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controller/errorController');
const blogRouter = require('./routes/blogRoutes');
const imageController = require('./controller/imageController');

const app = express();
// app logging
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

//Middlewars
app.use(express.json());

// Routes

app.use('/api/v1/blogs', blogRouter);
app.get('/image/:key', imageController.getImage);
app.use(globalErrorHandler);
module.exports = app;
