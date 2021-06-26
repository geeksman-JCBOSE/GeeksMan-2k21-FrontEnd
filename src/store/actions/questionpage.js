import * as actionTypes from './actionsTypes';
import axios from 'axios';
import * as actions from './index'
/*============Get Questions===========*/

export const getQuestionsStart = () => {
  return {
    type: actionTypes.GET_QUESTIONS_START,
  };
};

export const getQuestionsSuccess = (data) => {
  return {
    type: actionTypes.GET_QUESTIONS_SUCCESS,
    questionsdata:data
  };
};

export const getQuestionsFail = (error) => {
  return {
    type: actionTypes.GET_QUESTIONS_FAIL,
    error: error,
  };
};



export const getQuestions = (token,executeongetquestions,testtime) => {
  return (dispatch) =>{
    dispatch(getQuestionsStart());
        axios({
        method: 'post',
        url: `${process.env.REACT_APP_PUBLIC}/testquestions`,
        headers: {
          'Authorization': 'Bearer '+token
        }
      })
      .then((res) => {
       
        console.log('Questions Get ', res.data);
        localStorage.setItem('Testtoken',JSON.stringify({
          token
        }))
        localStorage.setItem('endtime',JSON.stringify({
          endtime:testtime
        }))
        localStorage.setItem('Questions',JSON.stringify({
          questions:res.data
        }))
        localStorage.setItem('submission',JSON.stringify({answers:[]}))
        dispatch(actions.resetteststartloading)
        dispatch(executeongetquestions())
        dispatch(
          getQuestionsSuccess(res.data)
        );
      })
      .catch((err) => {
        dispatch(actions.resetteststartloading())
        dispatch(getQuestionsFail(err));
      });
  };
};



/*============Post Questions===========*/

export const postQuestionsStart = () => {
    return {
      type: actionTypes.POST_QUESTIONS_START,
    };
  };
  
  export const postQuestionsSuccess = (response) => {
    return {
      type: actionTypes.POST_QUESTIONS_SUCCESS,
      postquestionsresponse:response
    };
  };
  
  export const postQuestionsFail = (error) => {
    return {
      type: actionTypes.POST_QUESTIONS_FAIL,
      error: error,
    };
  };
  
  
  
  export const postQuestions = (token,data,redirectonsubmit) => {
    return (dispatch) => {
      dispatch(actions.setteststartloading())
      var postData = ({
        answer:data
      });
      console.log(postData)
      let axiosConfig = {
        headers: {
          'Authorization': 'Bearer '+token
        },
      };
      axios
        .post(
          process.env.REACT_APP_PUBLIC+"/submit",
          postData,
          axiosConfig
        )
        .then((res) => {
          setTimeout(()=>{
          localStorage.removeItem('submission')
          localStorage.removeItem('Questions')
          localStorage.removeItem('Testtoken')
          localStorage.removeItem('endtime')
          },2000)
          dispatch(actions.resetteststartloading())
          dispatch(redirectonsubmit())
          dispatch(
            postQuestionsSuccess(res.status)
          );
        })
        .catch((err) => {
          dispatch(actions.resetteststartloading())
          dispatch(postQuestionsFail(err))
          console.log(err)
        });
    };
  };