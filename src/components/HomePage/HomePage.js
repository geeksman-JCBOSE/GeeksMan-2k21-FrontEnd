import React,{useState} from 'react';
import Particles from 'react-particles-js';
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
              value:60,
              density: {
                enable: true,
                value_area: 1000,
              }
            },
            "color": {
              "value": ["#BD10E0","#B8E986","#50E3C2","#FFD300","#E86363"]
            },
            "shape": {
              "type": "square",
              "stroke": {
                "width": 0,
                "color": "#b6b2b2"
              }
            }
            ,
             "size": {
              "value": 8.017060304327615,
              "random": true,
              "anim": {
                "enable": true,
                "speed": 12.181158184520175,
                "size_min": 0.1,
                "sync": true
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#fff",
              "opacity": 0.4,
              "width": 1
            }
           },
           "interactivity": {
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                }
            }
        }
  
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