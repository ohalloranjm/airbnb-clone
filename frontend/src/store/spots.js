import { csrfFetch } from './csrf';

const LIST_SPOTS = 'spots/list';
const DETAIL_SPOT = 'spots/detail';

const loadSpots = spots => {
  return {
    type: LIST_SPOTS,
    spots,
  };
};

const detailSpot = spot => {
  return {
    type: DETAIL_SPOT,
    spot,
  };
};

export const getSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots');
  const data = await res.json();
  dispatch(loadSpots(data.Spots));
  return res;
};

export const getSpotDetails = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  const spot = await res.json();
  dispatch(detailSpot(spot));
  return spot;
};

export const postSpot = spot => async () => {
  const body = JSON.stringify(spot);
  const res = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  if (res.ok) return res;
  else throw res;
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_SPOTS: {
      const newState = { ...state };
      const { spots: spotsArr } = action;
      spotsArr.forEach(spot => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    case DETAIL_SPOT: {
      const { spot } = action;
      return { ...state, [spot.id]: spot };
    }
    default:
      return state;
  }
};

export default spotsReducer;
