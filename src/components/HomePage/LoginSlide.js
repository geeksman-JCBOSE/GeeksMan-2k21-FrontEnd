import React, { Component, useState } from "react";
import mainpng from "../images/png/main.png"
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class LoginSlide extends Component {
  state = {
    show: false,
  };

  render() {
    return (
      <>
        <div className="login-slide container-fluid">
          <img src={mainpng} className="mainpng" alt="mainimg"/>
          <div className="login-slide-text-content">
            <h1>GeeksMan - The Coding Society</h1>
            <br />
            Join the <strong>Coding Society</strong> of CE Department of JCBOSE UST, YMCA{" "}
            <br />
            Practice coding, prepare for contests, and win challenges.
          </div>
          <div className="login-buttons">
            {this.props.authenticated&&(<Link className="login-button" to="/contests">
              Contests
            </Link>
    )}
            {!this.props.authenticated&&(<> <Link className="login-button" to="/login">
              Login
            </Link>
            <Link className="login-button" to="/login">
              SignUp
            </Link></>
            )}
           
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated :state.auth.token!==null,
  };
};

export default connect(mapStateToProps)(LoginSlide);
