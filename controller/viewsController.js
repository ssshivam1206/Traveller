const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // 1) get data from collection
  const tours = await Tour.find();

  // 2) bulid template

  // 3) using that template with tour data
  res.status(200).render('overview', {
    title: 'All Tour ',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  // 1) get data from collection
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  // 2) bulid template

  // 3) using that template with tour data
  res.status(200).render('tour', {
    title: 'The Forest Hikeroute',
    tour,
  });
});
