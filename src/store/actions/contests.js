import * as actionTypes from './actionsTypes';
import axios from 'axios';
import * as actions from './index'
import makeToast from '../../components/utils/Toaster';


/*=============== get contests =========================*/
export const getContestSuccess = (data) => {
  return {
    type: actionTypes.GET_CONTESTS_SUCCESS,
    contestdata:data
  };
};

export const RequestStart=()=>{
  return {
    type:actionTypes.BEGIN_REQUEST_LOADING,
  }
}

export const RequestEnd=()=>{
  return {
    type:actionTypes.END_REQUEST_LOADING,
  }
}

export const getContestFail = (error) => {
  return {
    type: actionTypes.GET_CONTESTS_FAIL,
    error: error,
  };
};

export const getContest = (token,url) => {
  
  return (dispatch) => {   
    dispatch(actions.setloading())
    let axiosConfig = {
      headers: {
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json;charset=UTF-8',
       
      },
    };
    axios
      .get(
        process.env.REACT_APP_PUBLIC+`/${url}`,
        axiosConfig
      )
      .then((res) => {
        dispatch(actions.resetloading())
        dispatch(getContestSuccess(res.data.contests));
        return 'val'
      })
      .catch((err) => {
        dispatch(RequestEnd())
        dispatch(getContestFail(err));
      });
  };
};

/*====================Get registered Contest by id===============*/


export const getcontestbyidsuccess=(data)=>{
  return {
    type:actionTypes.GET_CONTEST_BY_ID_SUCCESS,
    data,
  }
}

export const getcontestbyidfail=()=>{
  return {
    type:actionTypes.GET_CONTEST_BY_ID_FAIL
  }
}

export const getcontestbyid=(token,cid)=>{
  return (dispatch)=>{
    let axiosConfig={
      headers:{
        'Content-Type':'application/json;charset=UTF-8',
        'Authorization':`Bearer ${token}`,
      },
    };
    axios.get(
      process.env.REACT_APP_PUBLIC+`/contest/${cid}`,
      axiosConfig
      ).then((res)=>{
        dispatch(getcontestbyidsuccess(res.data.contest))
      }).catch(err=>{
        console.log(err)
      })
  }
}

/*=====================Get Registered Contests==============*/


export const getregisteredcontestsSuccess=(data)=>{
return {
  type:actionTypes.GET_REGISTERED_CONTEST_SUCCESS,
  registeredcontest:data
}
}

export const getregisteredcontestsFail=(err)=>{
  return {
    type:actionTypes.GET_REGISTERED_CONTEST_FAIL,
    err
  }
}


export const getregisteredContest=(uid)=>{
  return (dispatch)=>{
    dispatch(actions.setloading())
    let axiosConfig={
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
    };
    axios.get(
      process.env.REACT_APP_PUBLIC+`/getusercontests/${uid}`,
      axiosConfig
      ).then((res)=>{
        console.log(res.data.data)
        dispatch(actions.resetloading())
        dispatch(getregisteredcontestsSuccess(res.data.data))
      }).catch(err=>{
        dispatch(actions.resetloading())
        dispatch(getregisteredcontestsFail(err.message))
      })
  }
}



/*============Redux Signup===========*/



export const postContestSuccess = (status) => {
  return {
    type: actionTypes.REGISTER_CONTEST_SUCCESS,
  };
};

export const postContestFail = (error) => {
  return {
    type: actionTypes.REGISTER_CONTEST_FAIL,
    error: error,
  };
};



export const postContest = (user_name, pwd) => {
  return (dispatch) => {
    var postData = JSON.stringify({
      username: user_name,
      password: pwd,
    });

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };

    axios
      .post(
        'https://mis2020.herokuapp.com/rest-auth/login/',
        postData,
        axiosConfig
      )
      .then((res) => {
       
        dispatch(
          postContestSuccess(res.data.token, res.data.designation, res.data.full_name)
        );
      })
      .catch((err) => {
        dispatch(postContestFail(err));
      });
  };
};


/*=============== Register Contests ===================*/

export const registerContestSuccess = (data) => {
  return {
    type: actionTypes.REGISTER_CONTEST_SUCCESS,
    registeruserdata:data
  };
};

export const registerContestFail = (error) => {
  return {
    type: actionTypes.REGISTER_CONTEST_FAIL,
    error: error,
  };
};



export const registerContest = (uid,cid) => {
  return (dispatch) => {
    dispatch(actions.setloading())
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_PUBLIC}/registerforcontest`,
      data:{
        uid,
        cid
      }
    })
      .then((res) => {
        dispatch(actions.resetloading())
        makeToast('success','Registered successfully')
        dispatch(
          registerContestSuccess(res.data)
        );
        window.location.reload()
      })
      .catch((err) => {
        dispatch(actions.resetloading())
        dispatch(registerContestFail(err));
        makeToast('error',`${err.response.data.message}`)
      });
  };
};


/*=================Get Test Token================*/
export const getContestTokenSuccess = (token) => {
  return {
    type: actionTypes.GET_CONTEST_TOKEN_SUCCESS,
    contesttoken:token
  };
};

export const getContestTokenFail = (error) => {
  return {
    type: actionTypes.GET_CONTEST_TOKEN_FAIL,
    error: error,
  };
};



export const getContestToken = (uid,cid) => {
  return (dispatch) => {
    console.log(uid)
    console.log(cid)
    
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_PUBLIC}/gettesttoken/`,
      data:{
        uid,
        cid
      }
    })
      .then((res) => {
        console.log(res.data)
        dispatch(
          
          getContestTokenSuccess(res.data.token)
        );
      })
      .catch((err) => {
        dispatch(getContestTokenFail(err));
      });
  };
};




/*==========================Get test token=======================*/
export const gettesttoken=(token,cid,executeongetquestions,testtime)=>{
  return (dispatch)=>{
   dispatch(actions.setteststartloading())
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_PUBLIC}/gettesttoken`,
      data:{
        token,
        cid
      }
    })
      .then((res) => {
    
        dispatch(actions.getQuestions(res.data.Token,executeongetquestions,testtime))
      })
      .catch((err) => {
        dispatch(actions.resetteststartloading())
        console.log(err)
      });
  }
}