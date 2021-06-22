import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";

const initialState = {
  contestdata: [
    {
      id: "1",
      contestname: `<Hello World/>`,
      starttime: "09:00:00",
      endtime: "21:00:00",
      startdate: "2021-01-22",
      image:null,
      enddate: "2021-01-23",
      prize: "Selection in club",
      registeredusers: {
        id: "1",
        name: "aayush",
        slot: "1",
      },
      contestdetails: "This contest is for auditions of GeeksmanClub 2021",
      rules: "1. Dont cheat 2.Dont Copy 3.Dont Hesitate 4.Dont Complete",
      contesttype:null
    },
  ],
  loading: false,
  error:null,
  registeredContest:[],
  registeruserdata:null,
  contesttoken:null,
  activecontest:null
};

const getContestSuccess = (state, action) => {
  return updateObject(state, {
    contestdata: action.contestdata,
    error: null,
  });
};

const getContestFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const beginloading=(state,actions)=>{
  return updateObject(state,{
    loading:true
  })
}

const endloading=(state,actions)=>{
  return updateObject(state,{
    loading:false
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
    case actionTypes.BEGIN_REQUEST_LOADING:
      return beginloading(state,action);
    case actionTypes.END_REQUEST_LOADING:
      return endloading(state,action)
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
