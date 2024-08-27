import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/showBySpot';

const loadReviews = reviews => {
  return {
    type: LOAD_REVIEWS,
    reviews,
  };
};

export const getReviewsBySpotId = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await res.json();
  dispatch(loadReviews(data.Reviews));
  return res;
};

export const postReview = (review, spotId) => async dispatch => {
  const body = JSON.stringify(review);
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  const data = await res.json();
  dispatch(loadReviews([data]));
  return data;
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const { reviews } = action;
      const newState = { ...state };
      reviews.forEach(r => (newState[r.id] = r));
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
