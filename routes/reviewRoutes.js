const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// By default each routers has access to the params to its specific routes
// mergeParams:true-> gives access to the params of its parent route(tourRoute)
const router = express.Router({ mergeParams: true });

// api/v1/tours/:tourId/reviews/
// api/v1/reviews/

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
