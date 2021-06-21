import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
    loading:true
  };
};

export const authSuccess = (tokenId, userid) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: tokenId,
    userid: userid,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};


export const reduxLogin = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    var postData = JSON.stringify({
      email: email,
      password: password,
    });

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };

    axios
      .post(
        process.env.REACT_APP_PUBLIC+'/login',
        postData,
        axiosConfig
      )
      .then((res) => {
         
        localStorage.setItem('userdata',JSON.stringify({
          token:res.data.token,
          userid:res.data.userid
        }));
        dispatch(
          authSuccess(res.data.token,res.data.userid)
        );
      })
      .catch((err) => {
        dispatch(authFail(err));
        alert('Wrong Id/Password')
      });
  };
};

export const authCheckStatus = () => {
  return (dispatch) => {
    const userdata = JSON.parse(localStorage.getItem('userdata'))
    if (!userdata||!userdata.token) {
      dispatch(authFail("Error"));
    } else {
      dispatch(authSuccess(userdata.token,userdata.userid));
    }
  };
};

/*============Redux Signup===========*/
export const changePasswordSuccess = (status) => {
  return {
    type: actionTypes.CHANGE_PWD_SUCCESS,
    forgetstatus:status
  };
};

export const changePasswordFail = (err) => {
  return {
    type: actionTypes.CHANGE_PWD_FAIL,
    err:err
  };
};

export const authlogout=()=>{
  localStorage.removeItem('userdata')
  return {
    type:actionTypes.AUTH_LOGOUT
  }
}

export const changePassword = (email) => {
  return (dispatch) => {
    dispatch(authStart());
    var postData = JSON.stringify({
      email:email
    });

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    axios
      .post(
        process.env.REACT_APP_PUBLIC+"/forgotpassword",
        postData,
        axiosConfig
      )
      .then((res) => {
        
        dispatch(
          changePasswordSuccess(res.statusText)
        );
      })
      .catch((err) => {
        dispatch(changePasswordFail(err));
      });
  };
};

