import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Modal from "../utils/modals/modal";
import Loader from "../Loader/Loader";
import { withRouter } from 'react-router-dom'
import Timer from './timer'
class ContestCard extends Component {
  // state = {
  //   open: false,
  //   message: "NULL",
  //   yesbutton: false,
  //   redirect: false,
  //   redirectto: false,
  // show: false,
  //   redirecttouser: false,
  //   page: "not",
  // };
  state={
    isregistered:null,
    show:false,
    message:null,
    page:null,
    conteststarted:false
  }
  componentDidMount(){
    // console.log(this.props.rcontest)
    // this.setState({
    //   isregistered:this.props.rcontest.find(contest=>contest.contestid==this.props.cid),
    // })
  }
  changecontestactivestate=()=>{
    this.setState({
      conteststarted:true
    })
  }
  handleActiveContest = (e, userid, id, index) => {
    e.preventDefault();
    if (this.props.isAuthenticated){
      if(
        this.props.userdata.college === null ||
        this.props.userdata.phoneno === null ||
        this.props.userdata.year === null ||
        this.props.userdata.Branch === null
      ){
        this.setState({
          show: true,
          message:
            "You have to complete your details before registering for any contest",
          page:"userpanel"
        });
      }else{
        this.props.registerContest(userid,id);
        // this.setState({ redirectto: true });
        // if (this.props.userdata) {
        //   localStorage.setItem("activecontest", index);
        // }
        // this.props.history.push(`/contest/${this.props.contestname}/${id}`)
      }
    } else {
      this.setState({
        show: true,
        message: "Please Login First",
        page: "login",
      });
    }
  };
  handleRedirect = () => {
    this.setState({ redirect: true });
  };
  handleRedirectToUserPanel = (e) => {
    e.preventDefault();
    this.setState({ redirecttouser: true });
  };
   
  handlestartclick=()=>{
    this.props.history.push({
      pathname:`/contests/${this.props.contestname}`,
      search:`?id=${this.props.cid}`,
    })
  }
  render() {
   
    // let authRedirect = null;
    // if (this.state.redirect) {
    //   authRedirect = <Redirect to={"/contests/" + this.props.contestname} />;
    // }
    // let authRedirect2 = null;
    // if (this.state.redirecttouser) {
    //   if (this.state.page === "login") {
    //     authRedirect = <Redirect to="/login" />;
    //   } else {
    //     authRedirect2 = <Redirect to="/userpanel" />;
    //   }
    // }

    // if (this.state.registeruserdata !== null) {
    //   if (this.state.redirectto) {
    //     this.handleRedirect();
    //   }
    // }
    return (
      <>
        <div className="contest-card">
          {/* {authRedirect}
          {authRedirect2} */}
          {/* <div
            className="contest-card-heading"
            onClick={(e) =>
              this.handleActiveContest(
                e,
                this.props.userdata.id,
                this.props.cid,
                this.props.id
              )
            }
          >
            {this.props.contestname}
          </div>
          <div className="contest-card-description">
            {this.props.smalldescription}
          </div>
          <div className="contest-card-timer">
            <span className="contest-card-timer-prefix">Starts at </span>
            <span className="contes-card-time">{
            this.props.starttime.split('T')[0]
            }&nbsp;&nbsp;&nbsp;{this.props.endtime.split('T')[1].split(':')[0]}:{this.props.endtime.split('T')[1].split(':')[1]}</span>
          </div>
          <div className="contest-card-timer">
            <span className="contest-card-timer-prefix">Ends at </span>
            <span className="contes-card-time">{
            this.props.endtime.split('T')[0]
            }&nbsp;&nbsp;&nbsp;{this.props.endtime.split('T')[1].split(':')[0]}:{this.props.endtime.split('T')[1].split(':')[1]}</span>
          </div>
          <Timer starttime={this.props.starttime}/>
          {this.props.isregistered==-1&&(
           <div className="contest-card-register-button"
           onClick={(e) =>
             this.handleActiveContest(
               e,
               this.props.userdata.id,
               this.props.cid,
               this.props.id
             )
           }
         >
           Register Now
         </div>
          )}          
          {this.props.isregistered!=-1&&(
            <div className="contest-card-registered-tag">
            <h2>Registered</h2>
            </div>
          )} */}
          <div className="contestcardcontainer">
            <div className="contestimagecontainer">
              <div className="contestcard-gradient"></div>
            <img src={this.props.image} className="contestcard-img"/>

             
               {this.state.conteststarted&&(
                 <div className="conteststatus">Registration is over</div>
               )}
               {!this.state.conteststarted&&(
                <div className="conteststatus">Registration&nbsp;<b>ends</b>&nbsp;after:&nbsp;<Timer starttimems={this.props.registertime} changecardbtn={this.changecontestactivestate}/></div>
               )}
             
            </div>
            <div className="contestmiddlebody">
             <p className="contest__name">{this.props.contestname}</p>
             <div className="contestdetails">
                <div className="contestinfoitem">
                    <p className="eventlabel">Starts On</p>
                    <p className="eventvalue">{
                  (new Date(this.props.starttime)).toLocaleString() }</p>
                </div>
             <div className="contestdetails">
                <div className="contestinfoitem">
                    <p className="eventlabel">Entry Fee</p>
                    <p className="eventvalue">Free</p>
                </div>
             </div>
             <div className="contestdetails">
                <div className="contestinfoitem">
                    <p className="eventlabel">Venue</p>
                    <p className="eventvalue">{this.props.venue}</p>
                </div>
             </div>
             </div>
             <div className="shortdescription">
                {this.props.smalldescription}
             </div>
            </div>
            <div className="contestbottom">
                <div className="registercount">
                  {this.props.seatsfilled} registered&nbsp;-&nbsp;{this.props.seatsleft}seats left
                  </div>
                  {!this.props.isregistered&&!this.state.conteststarted&&(
                    <div className="contest-card-register-button" onClick={(e) =>
                      this.handleActiveContest(
                        e,
                        this.props.userdata.id,
                        this.props.cid,
                        this.props.id,
                      )
                    }>
                        Register
                    </div>
                 )}
                 {this.props.isregistered&&!this.state.conteststarted&&(
                  <div className="contest-card-register-button">
                  Registered
             </div>
                 )} 
                  {this.props.isregistered&&this.state.conteststarted&&(
                  <div className="contest-card-register-button" onClick={this.handlestartclick}>
                  Start now
             </div>
                 )} 
            </div>
          </div>
           <Modal
            show={this.state.show}
            heading="Error Correction"
            message={this.state.message}
            field=""
            page={this.state.page}
            confirm="true"
            // redirect={(e) => this.handleRedirectToUserPanel(e)}
          />
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerContest: (userid, contestid) => {
      dispatch(actions.registerContest(userid, contestid));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userdata: state.user.userdata,
    registeruserdata: state.contest.registeruserdata,
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContestCard));
