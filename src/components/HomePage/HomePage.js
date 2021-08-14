import React, { useEffect } from "react";
import Particles from "react-tsparticles";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import HomepageCarousel from "./HomepageCarousel";
import Chatbox from "../AdminSupport/Chatbox";
import * as actions from "../../store/actions/index";

const HomePage = (props) => {
  useEffect(() => {
    props.getContest(props.token, "contests?event_sub_category=upcoming");
  });
  return (
    <div className="homepage">
      <Particles
        params={{
          particles: {
            number: {
              value: 45,
              density: {
                enable: true,
                value_area: 1000,
              },
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 1,
              straight: false,
            },
            links: {
              enable: true,
              distance: 130,
              color: "#49c2b9",
              opacity: 0.4,
              width: 2,
            },
            collisions: {
              enable: true,
            },
            color: {
              value: ["#BD10E0", "#B8E986", "#50E3C2", "#FFD300", "#E86363"],
            },
            shape: {
              type: "polygon",
              stroke: {
                width: 0,
                color: "#b6b2b2",
              },
            },
            size:{
              value: 8.017060304327615,
              random: true,
              anim: {
                enable: true,
                speed: 6.181158184520175,
                size_min: 0.1,
                sync: true,
              },
            },
          },
          detectRetina: true,
        }}
      />
      <Navbar />
      <HomepageCarousel />
      {props.isAuthenticated && <Chatbox />}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    getContest: (token, url) => {
      dispatch(actions.getContest(token, url));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    token: localStorage.getItem("userdata")
      ? JSON.parse(localStorage.getItem("userdata")).token
      : null,
    isAuthenticated: state.auth.token !== null,
    userid: state.auth.userid,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
