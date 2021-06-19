/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51J3c0tSH1fxnLqHVlt6up1JUeP0viQDYURytObO35IHms8we26qReT81BIXFYKftYaczs2bJFSz6fRzHohJxuM8Q00QDi1WV2h'
);
// const stripe = Stripe(
//   'pk_test_TYooMQauvdEDq54NiTphI7jx'
// );

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    console.log(session);
    // 2) Create checkout form and charge credit card
    await stripe.redirectToCheckout({
       sessionId: session.data.session.id,
    })
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
