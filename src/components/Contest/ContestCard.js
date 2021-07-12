import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import Timer from './timer'
class ContestCard extends Component {
  state={
    conteststarted:false
  }
  changecontestactivestate=()=>{
    this.setState({
      conteststarted:true
    })
  }
  render() {
    return (
    
        <div className="contest-card">
          <div className="contestcardcontainer">
            <div className="contestimagecontainer">
              <div className="contestcard-gradient"></div>
            <img src={this.props.image} className="contestcard-img"/>
               {this.state.conteststarted&&(Date.now()<this.props.slotstarttime)&&(
                 <div className="conteststatus">Registration is over</div>
               )}
               {(Date.now()>=this.props.slotstarttime&&(Date.now()>=this.props.slotstarttime&&Date.now()<this.props.slotendtime))&&(
                 <div className="conteststatus">This Contest is live</div>
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
            
                <div className="contestinfoitem">
                    <p className="eventlabel">Entry Fee</p>
                    <p className="eventvalue">Free</p>
                </div>
          
             
                <div className="contestinfoitem">
                    <p className="eventlabel">Venue</p>
                    <p className="eventvalue">{this.props.venue}</p>
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
                      <Link  className="contest-card-register-button" to={`/contests/register/${this.props.cid}`}>
                       Register
                      </Link>
                 )}
                 {this.props.isregistered&&(Date.now()<this.props.slotstarttime)&&(
                  <div className="contest-card-register-button">
                  Registered
                 </div>
                 )} 
                  {this.props.isregistered&&this.state.conteststarted&&(!this.props.testgiven)&&(Date.now()>=this.props.slotstarttime&&Date.now()<this.props.slotendtime)&&(
                  <Link className="contest-card-register-button" to={`/contests/register/${this.props.cid}`}>Start now</Link>
                 )} 
            </div>
          </div>
        </div>
      
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
