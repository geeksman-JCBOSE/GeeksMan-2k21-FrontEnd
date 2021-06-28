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
    return (
      <>
        <div className="contest-card">
          <div className="contestcardcontainer">
            <div className="contestimagecontainer">
              <div className="contestcard-gradient"></div>
            <img src={this.props.image} className="contestcard-img"/>
               {this.state.conteststarted&&(Date.now()<this.props.slotstarttime)&&(
                 <div className="conteststatus">Registration is over</div>
               )}
               {(Date.now()>=this.props.slotstarttime&&(Date.now()>=this.props.slotstarttime&&Date.now()<this.props.slotendtime))&&(
                 <div className="conteststatus">Contest is live</div>
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
                 {this.props.isregistered&&!this.state.conteststarted&&(Date.now()<this.props.slotstarttime)&&(
                  <div className="contest-card-register-button">
                  Registered
                 </div>
                 )} 
                  {this.props.isregistered&&this.state.conteststarted&&(!this.props.testgiven)&&(Date.now()>=this.props.slotstarttime&&Date.now()<this.props.slotendtime)&&(
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
