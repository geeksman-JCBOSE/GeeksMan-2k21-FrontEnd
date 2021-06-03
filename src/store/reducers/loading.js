import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";
const initstate = {
  loading: false,
};

const setloading = (state, actions) => {
  return updateObject(state, {
    loading: true,
  });
};

const resetloading = (state, actions) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initstate, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return setloading(state, action);
    case actionTypes.RESET_LOADING:
      return resetloading(state, action);

    default:
      return state;
  }
};
export default reducer;
