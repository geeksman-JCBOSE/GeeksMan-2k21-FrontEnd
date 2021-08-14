import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import LoginSlide from "./LoginSlide";
import TopPerformersSlide from "./TopPerformersSlide";
import ContestSlide from "./ContestSlide";
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
          autoplayTimeout={4000}
        >
          <div className="item">
            <LoginSlide authenticated={this.props.isAuthenticated} />
          </div>
          <div className="item">
            
            <ContestSlide
            />
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
    isAuthenticated :state.auth.token!==null,
  };
};

export default connect(mapStateToProps)(HomepageCarousel);
