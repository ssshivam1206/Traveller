const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const Tour = require('./../../models/tourModel');

//console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => console.log('DB onnect successful!!'));

//read file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//import data
const importdata = async () => {
  try {
    await Tour.create(tours);
    console.log('Data loaded successfully!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//dalete data
const deletedata = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--importdata') {
  importdata();
} else if (process.argv[2] === '--deletedata') {
  deletedata();
}
