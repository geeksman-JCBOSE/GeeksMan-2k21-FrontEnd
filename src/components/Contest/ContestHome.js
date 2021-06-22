import React, { Component } from "react";
import ContestHeader from "./ContestHeader";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Modal from "../utils/modals/modal";
import { Redirect } from "react-router-dom";
import Loader from '../Loader/Loader'
import Navbar from "../Navbar";

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

    let startdate = new Date(start);
    let enddate = new Date(end);
    let nowdate = Date();
    console.log(startdate)
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
  onRedirect = (e,id) => {
      e.preventDefault(); 
      this.props.getContestToken(this.props.userid,this.props.data[id].id);
      this.setState({redirect:true})
  };
 starttest=()=>{
   this.props.gettesttoken(this.props.token,this.props.activecontestdata.id)
 }
  render() {
    console.log(this.props.activecontestdata)
    // console.log(_id)
    // let authRedirect = null;

    // var id=(localStorage.getItem("activecontest"));

    // if (this.state.redirect && this.props.contesttoken!==null) {
    //   this.props.getQuestions(this.props.contesttoken)
    // }
    // if(this.props.questiondata!==null){
    //   authRedirect = (
    //     <Redirect to={"/contests/" + this.props.data[id].Contestname + "/questions"} />
    //   );
    // }

    return (
      <>
      <div id="contest-home">
        <Navbar/>
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
            // onClick={e=>this.CompareDate(e,this.props.activecontestdata.starttime,this.props.activecontestdata.endtime)}
              className="contest-register-button"
              onClick={this.starttest}
            >
              Start Now
            </button>
          </div>
        </div>
        {/* <Modal
          show={this.state.open}
          message={this.state.message}
          redirect={e=>this.onRedirect(e,id)}
          confirm={this.state.confirm}
          heading={this.state.header}
          field=""
        /> */}
        {/* {authRedirect}  */}
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
    gettesttoken:(token,cid)=>{
      dispatch(actions.gettesttoken(token,cid))
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
    loading:state.contest.tokenloading
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ContestHome);
