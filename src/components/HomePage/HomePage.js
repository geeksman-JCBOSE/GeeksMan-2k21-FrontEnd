import React,{useState} from 'react';
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