const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

//console.log(process.env);

process.on('uncaughtException', (err) => {
  //console.log(err);
  console.log('Unhandle Rejection..... Shutting Down!!');
  console.log(err.name, err.messgae);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => console.log('DB onnect successful!!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server us running on ${port} .....`);
});

process.on('unhandledRejection', (err) => {
  //console.log(err);
  console.log(err.name, err.messgae);
  console.log('Unhandle Rejection..... Shutting Down!!');
  server.close(() => {
    process.exit(1);
  });
});
