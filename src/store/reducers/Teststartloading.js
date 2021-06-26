import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";
const initstate = {
  loading: false,
};

const setteststartloading = (state, actions) => {
  return updateObject(state, {
    loading: true,
  });
};

const resetteststartloading = (state, actions) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initstate, action) => {
  switch (action.type) {
    case actionTypes.SET_TESTSTART_LOADING:
      return setteststartloading(state, action);
    case actionTypes.RESET_TESTSTART_LOADING:
      return resetteststartloading(state, action);

    default:
      return state;
  }
};
export default reducer;
