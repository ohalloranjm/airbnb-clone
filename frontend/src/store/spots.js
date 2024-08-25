import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots';

const loadSpots = spots => {
  console.log('spots when you hit loadSpots: ', spots);
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

export const getSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots');
  const data = await res.json();
  dispatch(loadSpots(data.Spots));
  return res;
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = { ...state };
      const { spots: spotsArr } = action;
      spotsArr.forEach(spot => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
