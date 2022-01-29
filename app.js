const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controller/errorController');
const blogRouter = require('./routes/blogRoutes');

const app = express();
// app logging
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

//Middlewars
app.use(express.json());

// Routes

app.use('/api/v1/blogs', blogRouter);

app.use(globalErrorHandler);
module.exports = app;
