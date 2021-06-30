import React,{useState} from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Navbar from '../Navbar';
import HomepageCarousel from './HomepageCarousel';
import LoginModal from '../utils/modals/modal';
import Chatbox from '../AdminSupport/Chatbox'
// import Footer from './Footer';

const HomePage = () => {
    
    return (
        <div className="homepage">
            <Navbar />
            <HomepageCarousel />
             <Chatbox/>
            {/* <Footer /> */}
        </div>
    );
}

export default HomePage;