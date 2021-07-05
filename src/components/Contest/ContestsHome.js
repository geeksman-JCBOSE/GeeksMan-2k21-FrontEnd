import React, { Component } from "react";
import ContestCard from "./ContestCard";
import ContestHeader from "./ContestHeader";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class ContestsHome extends Component {
  componentDidMount() {
   
  }
  livecards=[]
  previouscards=[]
  upcomingcards=[]
  makecard(){
    if(this.props.data){
    this.props.data.forEach((contest, index) => {
      let protocard= <div class={this.classes.cards}>
       <ContestCard
         key={contest.id}
         contestname={contest.contestname}
         starttime={contest.starttime}
         endtime={contest.endtime}
         registertime={contest.registration_endtime}
         slotstarttime={contest.teststarttime}
         slotendtime={contest.testendtime}
         smalldescription={contest.contestdetail}
         venue={contest.venue}
         seatsfilled={contest.seats_filled}
         seatsleft={contest.seats_left}
         isregistered={contest.isregistered}
         id={index}
         image={contest.image}
         cid={contest.id}
         contesttype={contest.contesttype}
         testgiven={contest.testgiven}
       />
       </div>
       if(contest.contesttype==="ongoing"){
           this.livecards.push(protocard)
       }else if(contest.contesttype==="previous"){
              this.previouscards.push(protocard)
       }else if(contest.contesttype==="upcoming"){
            this.upcomingcards.push(protocard)
       }
     })
    }
  }
  classes = {
      cards:
        "col-md-6"
  }
  livecards=[];
  upcomingcards=[];
  previouscards=[];
  render() {
    this.makecard()
    return (
      <div className="Contests">
        <ContestHeader content="Contests" />
        <div className="row">
          <div className="col-lg-8 contest_sections">
            <div className="contests-section-heading">Live Contests</div>
            <div className="row no-gutters">
            {this.livecards.length===0&&(
              <h3 style={{"marginTop":"2rem"}}>There are no live Contests.</h3>
              )}
              {this.livecards.length!==0&&(
                this.livecards
              )}
            </div>
          </div>
          <div className="col-lg-8 contest_sections">
            <div className="contests-section-heading">Upcoming Contests</div>
            <div className="row no-gutters">
              {this.upcomingcards.length!==0&&(
                this.upcomingcards
              )}
              {this.upcomingcards.length===0&&(
                <h3 style={{"marginTop":"2rem"}}>There are no upcoming contests.</h3>
              )}
            </div>
          </div>
          <div className="col-lg-8 contest_sections">
            <div className="contests-section-heading">Previous Contests</div>
            <div className="row no-gutters">
              {this.previouscards.length!==0&&(
                this.previouscards
              )}
              {this.previouscards.length===0&&(
                <h3 style={{"marginTop":"2rem"}}>There are no previous contests.</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQuestions: (token) => {
      dispatch(actions.getQuestions(token));
    },
    postQuestions: (token, data) => {
      dispatch(actions.postQuestions(token, data));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    token:localStorage.getItem('userdata')?JSON.parse(localStorage.getItem('userdata')).token:null,
    data: state.contest.contestdata,
    ongoingcontest:state.contest.ongoingcontests,
    previouscontest:state.contest.previouscontests,
    upcomingcontest:state.contest.previouscontests,
    registeredcontests:state.contest.registeredContest
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContestsHome);
