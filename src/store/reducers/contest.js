import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";

const initialState = {
  contestdata: [],
  loading: false,
  error:null,
  registeredContest:[],
  registeruserdata:null,
  contesttoken:null,
  activecontest:null,
  totalcontests:0
};

const getContestSuccess = (state, action) => {
  return updateObject(state, {
    contestdata: action.contestdata,
    totalcontests:action.contestdata.length,
    error: null,
    loading:false
  });
};

const getContestFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const startgetcontest=(state,actions)=>{
  return updateObject(state,{
    loading:true
  })
}


const postContestSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    name: action.name,
    designation: action.designation,
    error: null,
    loading: false,
  });
};

const postContestFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const registeredcontestssuccess=(state,action)=>{
return updateObject(state,{
  registeredContest:action.registeredcontest
})
}

const registeredContestFail=(state,action)=>{
  return updateObject(state,{
    error:action.error
  })
}

const registerContestSuccess = (state, action) => {
  return updateObject(state, {
    registeruserdata:action.registeruserdata,
    error: null,
    loading: false,
  });
};

const registerContestFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const getContestTokenSuccess = (state, action) => {
  return updateObject(state, {
    contesttoken:action.contesttoken,
    error: null,
    loading: false,
  });
};

const getContestTokenFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};


const getcontestbyidsuccess=(state,action)=>{
  return updateObject(state,{
    activecontest:action.data
  })
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CONTESTS_SUCCESS:
      return getContestSuccess(state, action);
    case actionTypes.GET_QUESTIONS_FAIL:
      return getContestFail(state, action);
    case actionTypes.POST_CONTESTS_SUCCESS:
      return postContestSuccess(state, action);
    case actionTypes.POST_QUESTIONS_FAIL:
      return postContestFail(state, action);
    case actionTypes.REGISTER_CONTEST_SUCCESS:
      return registerContestSuccess(state, action);
    case actionTypes.REGISTER_CONTEST_FAIL:
      return registerContestFail(state, action);
    case actionTypes.START_GET_CONTEST:
      return startgetcontest(state,action);
    case actionTypes.GET_CONTEST_BY_ID_SUCCESS:
      return getcontestbyidsuccess(state,action)
    case actionTypes.GET_REGISTERED_CONTEST_SUCCESS:
      return registeredcontestssuccess(state,action)
    case actionTypes.GET_REGISTERED_CONTEST_FAIL:
      return registeredContestFail(state,action);  
    case actionTypes.GET_CONTEST_TOKEN_SUCCESS:
      return getContestTokenSuccess(state, action);
    case actionTypes.GET_CONTEST_TOKEN_FAIL:
      return getContestTokenFail(state, action);
    default:
      return state;
  }
};

export default reducer;
