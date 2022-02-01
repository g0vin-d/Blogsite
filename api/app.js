const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
const globalErrorHandler = require('./controller/errorController');
const blogRouter = require('./routes/blogRoutes');
const imageController = require('./controller/imageController');

const app = express();

//Middlewars
app.use(cors());

// app logging
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

app.use(express.json());

// Routes

app.use('/api/v1/blogs', blogRouter);
app.use(globalErrorHandler);
module.exports = app;
