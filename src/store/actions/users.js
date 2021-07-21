import * as actionTypes from './actionsTypes';
import axios from 'axios';
import makeToast from '../../components/utils/Toaster';

export const startgetuser=()=>{
  return {
    type:actionTypes.START_GET_USER
  }
}

export const getUserSuccess = (userdata) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    userdata:userdata
  };
};

export const getUserError = (error) => {
  return {
    type: actionTypes.GET_USER_FAIL,
    error: error,
  };
};



export const getUser = (userid) => {
  return (dispatch) => {
    dispatch(startgetuser())
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    axios
      .get(
        process.env.REACT_APP_PUBLIC+'/users/getuser/'+userid,
        axiosConfig,
      )
      .then((res) => {
        
        dispatch(
          getUserSuccess(res.data.user)
        );
      })
      .catch((err) => {
        dispatch(getUserError(err));
      });
  };
};

/*============GET USERS CONTESTS=======================*/
export const getUserContestSuccess = (userdata) => {
  return {
    type: actionTypes.GET_USER_CONTEST_SUCCESS,
    usercontestdata:userdata
  };
};

export const getUserContestFail = (error) => {
  return {
    type: actionTypes.GET_USER_CONTEST_FAIL,
    error: error,
  };
};



export const getUserContest = (uid) => {
  return (dispatch) => {
    
    let axiosConfig = {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "multipart/form-data"
      },
      
    };

    axios
      .get(
        process.env.REACT_APP_PUBLIC+'/getusercontests/'+uid,
        axiosConfig,
      )
      .then((res) => {
        dispatch(
          getUserContestSuccess(res.data)
        );
      })
      .catch((err) => {
        dispatch(getUserContestFail(err));
      });
  };
};


/*============Redux Signup===========*/
 

 export const postUserstart=()=>{
   return {
     type:actionTypes.POST_USER_START,
     loading:true
   }
 }
 export const postUserSuccess = (poststatus) => {
    return {
      type: actionTypes.POST_USER_SUCCESS,
      poststatus:poststatus,
    };
  };
  export const postUserError = (error) => {
    return {
      type: actionTypes.POST_USER_FAIL,
      posterror: error,
    };
  };
  export const postUser = (name,email,password) => {
    return (dispatch) => {
    dispatch(postUserstart())
      axios({
        method: 'post',
        responseType: 'json',
        url: `${process.env.REACT_APP_PUBLIC}/signup`,
        data: {
          name,
          email,
          password
        }
      })
       .then(response => {
         makeToast("success",'Check your email for verification')
         dispatch(postUserSuccess(response));
       })
       .catch(error=>{
       if(error.response)
       makeToast("error",`${error.response.data.message}`)
       dispatch(postUserError(error.message))
       });
    };
  };
/*============Patch Users===========*/
export const patchuserstart=()=>{
  return {
    type:actionTypes.PATCH_USER_START
  }
}
export const patchUserSuccess = (poststatus) => {
  return {
    type: actionTypes.PATCH_USER_SUCCESS,
    patchStatus:poststatus
  };
};
export const patchUserError = (error) => {
  return {
    type: actionTypes.PATCH_USER_FAIL,
    error: error,
  };
};
export const patchUser = (userid,college,profilePhotoLocation,year,Branch,phoneno) => {
  return (dispatch) => {
    dispatch(patchuserstart())
    let updates={college,profilePhotoLocation,year,Branch,phoneno}
    let updatedata={}
    for(const key in updates){
      if(updates[key]!==""){
        updatedata[key]=updates[key]
      }
    }
    axios({
      method: 'patch',
      responseType: 'application/json;charset=UTF-8',
      url: `${process.env.REACT_APP_PUBLIC}/users/updateuser/${userid}`,
      data:updatedata
    })
     .then(response =>{
       makeToast('success','Details updated successfully')
       dispatch(postUserSuccess(response.status));
     })
     .catch(error => {
       makeToast('error','Updation failed')
       dispatch(postUserError(error))
     });
  };
};

  
