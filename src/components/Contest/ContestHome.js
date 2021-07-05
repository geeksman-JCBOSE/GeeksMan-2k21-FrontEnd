import React, { Component } from "react";
import ContestHeader from "./ContestHeader";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Modal from "../utils/modals/modal";
import Loader from '../Loader/Loader'
import Navbar from "../Navbar";
import {withRouter} from 'react-router-dom'

class ContestHome extends Component {
  state = {
    open: false,
    message: "",
    redirect: false,
    confirm:"false",
    header:"",
    contest:[],
    _id:null,
    disabled:true,
    secondtimer:null
  };

  componentDidMount(){
    const search = this.props.location.search;
    const _id = new URLSearchParams(search).get("id")
    this.props.getcontestinfo(this.props.token,_id)
    if(localStorage.getItem('oneminute')){
    let countDownDate=JSON.parse(localStorage.getItem('oneminute')).time
    // Update the count down every 1 second
    let x = setInterval( ()=>{
      // Get todays date and time
      var now = Date.now();
      // Find the distance between now an the count down date
      var distance = countDownDate - now;
      // Time calculations for seconds
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.setState({secondtimer:seconds});
      // Output the result in an element with id="demo"

      // If the count down is over, write some text
      if (seconds === 0 ) {
        clearInterval(x);
         localStorage.removeItem('oneminute')
         this.setState({disabled:false})
        
      }
    }, 1000);
  }
  }
  
  CompareDate = (e, start,end) => {
    e.preventDefault();
    let startdate =start;
    let enddate = end;
    let nowdate = Date.now();
        if (startdate > nowdate && nowdate<enddate) {
            this.setState({ open: true, message: "The contest is not active. Either the Contest has not started or its not your slot, please wait for your time slot or the contest to start.", header:"Message!" });
        }
        else if(enddate < nowdate && nowdate>startdate){
          this.setState({ open: true, message: "The contest is not active. Either the Contest has ended or you have missed your slot, please contact admin if it's a mistake.", header:"Message!" });
        }
        else{
            this.setState({
                open:true,
                header:"Confirm Message!",
                message:"Are you sure you want to start the contest. After clicking this you won't be able to backoff",
                confirm:true,                
            })
        }
  };
  setShow=()=>{
    this.setState({open:false})
  }
  executeongetquestions=() =>{
    console.log('it ran')
   this.props.history.push({
     pathname:`/contest/${this.props.activecontestdata.contestname}/questions`
   })
  }

 starttest=()=>{
   let time=parseInt(this.props.activecontestdata.contestduration)*60*60*1000
   let slotend=this.props.activecontestdata.testendtime
   let contesttime
   if((Date.now()+time)>=slotend)
   contesttime=time-((Date.now()+time)-slotend)+Date.now()
   else
   contesttime=time+Date.now()
   this.props.gettesttoken(this.props.token,this.props.activecontestdata.id,this.executeongetquestions,contesttime)
 }
  render() {
    return (
      <>
      <div className="contest-page" >
      {this.props.loading&&(
        <Loader/>
      )
      }
      <div style={{display:'none'}} >
      <Navbar/>
      </div>
      <div id="contest-home">
        <ContestHeader content="Contest Details" />
        <div className="row">
          <div className="col-md-7" >
            <div className="contest-name">{this.props.activecontestdata?this.props.activecontestdata.contestname:null}</div>
            <div className="contest-instructions-container">
              <div className="contest-instructions-heading">Read The instructions carefully</div>
              <div className="contest-instructions">
                {this.props.activecontestdata?this.props.activecontestdata.rules:null}
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <button
              onClick={e=>this.CompareDate(e,this.props.activecontestdata.teststarttime,this.props.activecontestdata.testendtime)}
              className="contest-register-button"
              disabled={this.state.disabled}
            >
              Start Now
            </button>
          </div>
          {this.state.secondtimer&&(
 <div className="contest-startsixty-timer">
 Contest will start in  {this.state.secondtimer} seconds
 </div>
          )}
          {!this.state.secondtimer&&(
          <div className="contest-startsixty-timer">
            You can click the start button to start your contest
            </div>
          )}
        </div>
        <Modal
          show={this.state.open}
          setShow={this.setShow}
          message={this.state.message}
          confirm={this.state.confirm}
          heading={this.state.header}
          starttest={this.starttest}
          field=""
        />
      </div>
      </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContestToken: (uid,cid) => {
      dispatch(actions.getContestToken(uid,cid));
    },
    getQuestions: (token) => {
      dispatch(actions.getQuestions(token));
    },
    getcontestinfo:(token,cid)=>{
      dispatch(actions.getcontestbyid(token,cid))
    },
    gettesttoken:(token,cid,executeongetquestions,testtime)=>{
      dispatch(actions.gettesttoken(token,cid,executeongetquestions,testtime))
    }
  };
};

const mapStateToProps = (state) => {
  return {
    token:localStorage.getItem('userdata')?JSON.parse(localStorage.getItem('userdata')).token:null,
    data: state.contest.contestdata,
    userid:localStorage.getItem('userdata')?JSON.parse(localStorage.getItem('userdata')).token:null,
    activecontestdata:state.contest.activecontest,
    registeruserdata:state.contest.registeruserdata,
    contesttoken:state.contest.contesttoken,
    questiondata: state.question.questionsdata,
    loading:state.starttestloading.loading
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ContestHome));
