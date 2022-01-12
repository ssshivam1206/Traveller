const express = require('express');
const tourController = require('../controller/tourController');
const authController = require('../controller/authController');
const reviewRouter = require('../routes/reviewRoutes');
// const { createTour } = require('../controller/tourController');
const router = express.Router();

//router.param('id', tourController.checkId);

// posted /tour/ryfgs4757dhr/reviews/
// get /tour/ryfgs4757dhr/reviews/
// get /tour/ryfgs4757dhr/reviews/46dg5267djr

router.use('/:tourId/reviews', reviewRouter);

//Tope 5 cheap tours
router
  .route('/top-5-cheap')
  .get(tourController.aliseTopTour, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getTourWithIn);
// /tours-within/distance=233&center=45,45&unit=mi
//  /tours-within/233/center/34.120267,-118.138490/unit/mi

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourPhoto,
    tourController.resizeTourPhoto,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
