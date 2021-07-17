import React, { Component } from "react";
import ContestCard from "./ContestCard";
import { withRouter } from "react-router";
import ContestHeader from "./ContestHeader";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class ContestsHome extends Component {
  state={
    activesubcategory:null,
    nullcontest:'There are no contests'
  }
  cards=[]
  url=this.props.match.params
  componentDidMount(){
   this.props.getContest(this.props.token,this.url.contestquery)
   this.makecard()
  }
  makecard(){
    if(this.props.data.length!=0){
      this.cards=[...this.props.data.map((contest, index) => {
    return( <ContestCard
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
     />)
     })]
  }else{
    this.cards=[]
  }
}
  handlecontestsubcategoryclick=(subtype,nullline)=>{
    this.setState({
      activesubcategory:subtype,
      nullcontest:nullline
    })
    this.props.history.push({
      pathname:`/contests`,
      search:`?event_sub_category=${subtype}`
    })
    this.props.getContest(this.props.token,`contests?event_sub_category=${subtype}`)
  }
  render(){
    this.makecard()
    return (
      <div className="Contests">
        <ContestHeader content="Contests" />
        <div className="contests__type">
          <div className={this.state.activesubcategory==='ongoing'?'activecontesttype':null+' contests_live'} onClick={this.handlecontestsubcategoryclick.bind(this,'ongoing','There are no ongoing contests')}>
             <p>Live </p>
          </div>
          <div className={ this.state.activesubcategory==='upcoming'?'activecontesttype':null +' contests_upcoming'} onClick={this.handlecontestsubcategoryclick.bind(this,'upcoming','There are no upcoming contests')}>
              <p>Upcoming </p>
          </div>
          <div className={this.state.activesubcategory==='previous'?'activecontesttype':null+ ' contests_previous'} onClick={this.handlecontestsubcategoryclick.bind(this,'previous','There are no past contests')}>
              <p>Previous </p>
          </div>
        </div>
        <div>
          <div className="contest_sections">
            <div className="cards__container">
            {this.cards.length===0&&(
              <h3 style={{marginTop:"2rem",textAlign:'center',width:'100%',color:'var(--home-text)'}}>{this.state.nullcontest}</h3>
              )}
              {this.props.length!==0&&(
                this.cards
              )}
               {this.props.length!==0&&(
                this.cards
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
    getContest:(token,url)=>{
      dispatch(actions.getContest(token,url));
    },
  };
};

const mapStateToProps = (state) =>{
  return {
    token:localStorage.getItem('userdata')?JSON.parse(localStorage.getItem('userdata')).token:null,
    data: state.contest.contestdata,
    contestslength:state.contest.totalcontest
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContestsHome));
