import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/showBySpot';

const loadReviews = reviews => {
  return {
    type: LOAD_REVIEWS,
    reviews,
  };
};

export const getReviewsBySpot = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await res.json();
  dispatch(loadReviews(data.Reviews));
  return res;
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
