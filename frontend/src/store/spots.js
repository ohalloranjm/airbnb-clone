import { csrfFetch } from './csrf';

const LIST_SPOTS = 'spots/list';
const DETAIL_SPOT = 'spots/detail';
const UPDATE_SPOT = 'spots/update';

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

const updateSpot = spot => {
  return {
    type: UPDATE_SPOT,
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
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  return res;
};

export const postSpotOtherImage = (spotId, url) => async () => {
  const body = JSON.stringify({ url, preview: false });
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  return res;
};

export const putSpot = (spotId, spot) => async dispatch => {
  const body = JSON.stringify(spot);
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  const data = await res.json();
  dispatch(updateSpot(data));
  return data;
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
    case UPDATE_SPOT: {
      const { spot } = action;
      const newState = { ...state };
      const spotToUpdate = newState[spot.id];
      if (!spotToUpdate) {
        newState[spot.id] = spot;
      } else {
        [
          'id',
          'ownerId',
          'address',
          'city',
          'state',
          'country',
          'name',
          'description',
          'price',
        ].forEach(key => {
          if (key in spot) newState[spot.id][key] = spot[key];
        });
      }
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
