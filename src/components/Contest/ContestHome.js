import React, { Component } from "react";
import ContestHeader from "./ContestHeader";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Modal from "../utils/modals/modal";
import { Redirect } from "react-router-dom";
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
    _id:null
  };

  componentDidMount(){
    const search = this.props.location.search;
    const _id = new URLSearchParams(search).get("id")
    this.props.getcontestinfo(this.props.token,_id)
  }
  
  CompareDate = (e, start,end) => {
    e.preventDefault();
    let startdate = new Date(start).getTime();
    let enddate = new Date(end).getTime();
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
   this.props.gettesttoken(this.props.token,this.props.activecontestdata.id,this.executeongetquestions,"2021-06-25T23:52:00.894")
 }
  render() {
    return (
      <>
      <div className="contest-page" >
      <Navbar/>
      <div id="contest-home">
      {this.props.loading&&(
        <Loader/>
      )
      }
    
        
        <ContestHeader content="Contest Details" />
        <div className="row">
          <div className="col-md-7" style={{"paddingLeft":"6rem"}}>
            <div className="contest-name">{this.props.activecontestdata?this.props.activecontestdata.contestname:null}</div>
            <div className="contest-remaining-time">
              The contest will start at {this.props.activecontestdata?this.props.activecontestdata.starttime:null}{" "}
            </div>
            <div className="contest-instructions-container">
              <div className="contest-instructions-heading">Instructions</div>
              <div className="contest-instructions">
                {this.props.activecontestdata?this.props.activecontestdata.rules:null}
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <button
              onClick={e=>this.CompareDate(e,"2021-06-27T22:20:00.894","2021-06-28T23:52:00.894")}
              className="contest-register-button"
              // onClick={this.starttest}
            >
              Start Now
            </button>
          </div>
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
