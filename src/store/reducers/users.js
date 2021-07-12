import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  error: null,
  loading: false,
  postUserStatus:null,
  userdata:[
    {
      id:"1",
      name:"Aayush",
      email:"aayushtyagi2020@gmail.com",
      phoneno:"73r5872789wqe",
      college:"JC Bose UST",
      year:"3",
      branch:"ECE",
      image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fnature%2F&psig=AOvVaw1Gx-xDpx4cAGgW9Ruidzwm&ust=1611419071622000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOihnf35r-4CFQAAAAAdAAAAABADF"
    }
  ],
  usercontestdata:[],
  patchStatus:null,
  posterror:"",
  loading:false
};

const getuserstart=(state,action)=>{
  return updateObject(state,{
    loading:true
  })
}

const getUserSuccess = (state, action) => {
  return updateObject(state, {
    userdata:action.userdata,
    loading:false
  });
};

const postuserstart=(state,action)=>{
  return updateObject(state,{
    loading:action.loading
  })
}
const getUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const getUserContestSuccess = (state, action) => {
  return updateObject(state, {
    usercontestdata:action.usercontestdata
  });
};

const getUserContestFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};


const postUserSuccess = (state, action) => {
    return updateObject(state, {
      postUserStatus:action.poststatus,
      loading:false
    });
  };
  
  const postUserFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false,
      posterror:action.posterror,
      loading:false
    });
  };

  const patchUserSuccess = (state, action) => {
    return updateObject(state, {
      patchStatus:action.patchStatus
    });
  };
  
  const patchUserFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false,
    });
  };

  const verifyUserSuccess = (state, action) => {
    return updateObject(state, {
      token: action.token,
      verifystatus:action.verifystatus,
      error:null
    });
  };
  
  const verifyUserFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false,
    });
  };



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return getUserSuccess(state, action);
    case actionTypes.GET_USER_FAIL:
      return getUserFail(state, action);
    case actionTypes.GET_USER_CONTEST_SUCCESS:
      return getUserContestSuccess(state, action);
    case actionTypes.POST_USER_START:
      return postuserstart(state,action)
    case actionTypes.GET_USER_CONTEST_FAIL:
      return getUserContestFail(state, action);
    case actionTypes.POST_USER_SUCCESS:
      return postUserSuccess(state, action);
    case actionTypes.POST_USER_FAIL:
      return postUserFail(state, action);
    case actionTypes.START_GET_USER:
      return getuserstart(state,action);
    case actionTypes.PATCH_USER_SUCCESS:
      return patchUserSuccess(state, action);
    case actionTypes.PATCH_USER_FAIL:
      return patchUserFail(state, action);
    case actionTypes.VERIFY_USER_SUCCESS:
      return verifyUserSuccess(state, action);
    case actionTypes.VERIFY_USER_FAIL:
      return verifyUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;