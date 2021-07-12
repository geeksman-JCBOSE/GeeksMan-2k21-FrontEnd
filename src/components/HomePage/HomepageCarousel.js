import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import LoginSlide from "./LoginSlide";
import TopPerformersSlide from "./TopPerformersSlide";
import ContestSlide from "./ContestSlide";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class HomepageCarousel extends Component {
  
  render() {
    return (
      <div className="homepage-carousel-container">
        <OwlCarousel
          className="owl-theme"
          loop
          margin={10}
          items={1}
          nav={false}
          autoplay
          autoplayTimeout={40000000}
        >
          <div className="item">
            <LoginSlide authenticated={this.props.isAuthenticated} />
          </div>
          <div className="item">
            {/* <ContestSlide
              name={this.props.data[0].Contestname}
              starttime={this.props.data[0].starttime}
              endtime={this.props.data[0].endtime}
            /> */}
          </div>
          <div className="item">
            <TopPerformersSlide />
          </div>
          
        </OwlCarousel>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuthenticated :state.auth.token!==null,
    data: state.contest.contestdata,
    userid:state.auth.userid
  };
};

export default connect(mapStateToProps)(HomepageCarousel);
