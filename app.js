const path = require('path');
const express = require('express');
const morgan = require('morgan');
//const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const ErrorHandler = require('./controller/errorController');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const viewsRouter = require('./routes/viewsrouter');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// set security headers
app.use(helmet());

//Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit user request
// const limiter = rateLimit({
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   windowMs: 30 * 60 * 1000, // 15 minutes
//   message: 'Too Many requests from this IP...Please try again after in an Hour',
// });

// // Apply the rate limiting middleware to all requests
// app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

//data Sanitize against NoSql query Injection
app.use(mongoSanitize());

// Data Sanitize againts XSS
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'difficulty',
      'ratingsAverage',
      'ratingsQuantity',
      'price',
      'maxGroupSize',
    ],
  })
);

// app.use((req, res, next) => {
//   console.log('Hello from middleware ');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

//console.log(tours);

//routes

app.use('/', viewsRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`can't find ${req.originalUrl} on this server`);
  // err.status = 'Fail';
  // err.statusCode = 404;

  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(ErrorHandler);
//server

module.exports = app;
