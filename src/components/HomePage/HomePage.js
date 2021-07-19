import React,{useState} from 'react';
import Particles from 'react-tsparticles';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Navbar from '../Navbar';
import { connect } from "react-redux";
import HomepageCarousel from './HomepageCarousel';
import LoginModal from '../utils/modals/modal';
import Chatbox from '../AdminSupport/Chatbox'
// import Footer from './Footer';

const HomePage = (props) => {
    return (
        <div className="homepage">
           <Particles
        params={{
          particles: {
            number: {
              value:50,
              density: {
                enable: true,
                value_area: 1000,
              }
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            collisions: {
              enable: true,
            },
            "color": {
              "value": ["#BD10E0","#B8E986","#50E3C2","#FFD300","#E86363"]
            },
            "shape": {
              "type": "polygon",
              "stroke": {
                "width": 0,
                "color": "#b6b2b2"
              }
            },
            
             "size": {
              "value": 8.017060304327615,
              "random": true,
              "anim": {
                "enable": true,
                "speed":6.181158184520175,
                "size_min": 0.1,
                "sync": true
              }
            },
            lineLinked: {
              "enable": true,
              "distance": 150,
              "color": "#49c2b9",
              "opacity": 0.6,
              "width": 1
            }
           },
           detectRetina: true,
  
        }}
      />
            <Navbar />
            <HomepageCarousel />
            {props.isAuthenticated&&(
             <Chatbox/>
            )}
            
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.token!==null,
      userid:state.auth.userid
    };
  };
export default connect(mapStateToProps,null)(HomePage);