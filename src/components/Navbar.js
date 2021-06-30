import React,{useState,useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import { NavLink, Link } from "react-router-dom";
import Switch from '@material-ui/core/Switch';
import Geeksman from "./images/png/geeksman.png";
import "bootstrap/js/src/collapse.js";

const Navbar = (props) => {
const [state,setState]=useState('light')
  useEffect(() => {
    const mode=localStorage.getItem('mode')
    if(!mode){
      localStorage.setItem('mode',JSON.stringify({
        mode:'light'
      }))
     setState('light');
    }
    else{
      setState(JSON.parse(localStorage.getItem('mode')).mode)
    }
  }, [])
  if(state==='dark'){
    //enable dark mode...
  
    console.log('dark mode')
    document.documentElement.style.setProperty('--homebackground', 'rgb(25,30,44)');
    document.documentElement.style.setProperty('--home-text', 'white');
    document.documentElement.style.setProperty('--nav-link', 'white');
    document.documentElement.style.setProperty('--primary', 'white');
    document.documentElement.style.setProperty('--contestbackground', 'rgb(25,30,44)');
    document.documentElement.style.setProperty('--contestHeader', '#673AB7');
    document.documentElement.style.setProperty('--contestcardbody', '#2B2F3E');
    document.documentElement.style.setProperty('--black-to-pink', '#EE4861');
    document.documentElement.style.setProperty('--bg-primary', '#B4B5BA');
    document.documentElement.style.setProperty('--ques-page-navbar', 'rgb(25,30,44)');
    document.documentElement.style.setProperty('--about-pagetext', 'white');
  }
  if(state==='light'){
    console.log('light mode')
    document.documentElement.style.setProperty('--homebackground', '#f6fcfb');
    document.documentElement.style.setProperty('--home-text', 'black');
    document.documentElement.style.setProperty('--nav-link', 'black');
    document.documentElement.style.setProperty('--primary', '#224056');
    document.documentElement.style.setProperty('--contestbackground', 'white');
    document.documentElement.style.setProperty('--contestHeader', '#eee');
    document.documentElement.style.setProperty('--contestcardbody', 'white');
    document.documentElement.style.setProperty('--contest-description', '#616161');
    document.documentElement.style.setProperty('--black-to-pink', 'black');
    document.documentElement.style.setProperty('--bg-primary', '#dbf3f1');
    document.documentElement.style.setProperty('--ques-page-navbar', '#3f51b5');
    document.documentElement.style.setProperty('--about-pagetext', '#224056');
   
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleChange = (event) => {
    if(state==='light'){
      localStorage.setItem('mode',JSON.stringify({
        mode:'dark'
      }))
      setState('dark')
    }
    else{
      localStorage.setItem('mode',JSON.stringify({
        mode:'light'
      }))
      setState('light')
    }
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleburgerclick=()=>{
    const burger=document.querySelector('.navbar-burger')
    const nav=document.querySelector('.navbar__links ul')
    nav.classList.toggle('nav-active')
    burger.classList.toggle('toggle')
    const navlinks=document.querySelectorAll('.navbar__links ul a')
    navlinks.forEach((link,index)=>{
        if(link.style.animation){
            link.style.animation=``
        }else{
         link.style.animation=`navlinksfade 0.5s ease forwards ${index/7+.5}s`
        }
    })
}

  return (
            <div className="navbar">
                <div className="navbar__container">
                <div className="navbar-burger" onClick={handleburgerclick}>
                          <div className="line1"></div>
                          <div className="line2"></div>
                          <div className="line3"></div>
                      </div>
                  <div className="navbar__logo-links">

                  <div className="navbar__logo">
                    <Link className="navbar-logo" to="/">
                    <img src={Geeksman}/> GeeksMan
                    </Link>
                    
                  </div>
              <div className="navbar__links">
                 <ul>
                     <Link to="/" ><li>Home</li></Link>
                     <Link to="/contests"><li>Contests</li></Link>
                     <Link to="/about"><li>About</li></Link>
                     {props.isAuthenticated&&(
                     <Link onClick={props.authlogout}><li> Logout</li></Link>
                     )}
                 </ul>
              </div>
              </div>
              
              <div className="navbar__userprofile">
           
             {props.isAuthenticated&&(
                <div style={{color:`${getComputedStyle(document.documentElement).getPropertyValue('--home-text')}`}} >
                <IconButton
                   aria-label="account of current user"
                    aria-controls="menu-appbar"
                   aria-haspopup="true"
                   onClick={handleMenu}
                   color="inherit"
                   >
                   <AccountCircle />
                 </IconButton>
                 <Menu
                   id="menu-appbar"
                   anchorEl={anchorEl}
                   anchorOrigin={{
                     vertical: "top",
                     horizontal: "right",
                   }}
                   keepMounted
                   transformOrigin={{
                     vertical: "top",
                     horizontal: "right",
                   }}
                   open={open}
                   onClose={handleClose}
                 >
                   <MenuItem onClick={handleClose}><Link to="/userpanel">Profile</Link></MenuItem>
                   <MenuItem onClick={handleClose}><Link to="/userpanel">Settings</Link></MenuItem>
                  </Menu>
                </div>
             )}   
                  <Switch
                    checked={!(state==='light')}
                    onChange={handleChange}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
            </div>
              </div>
              </div>
    
  );
};

const mapDispatchToProps=(dispatch)=>{
  return {
    authlogout:()=>{
      dispatch(actions.authlogout())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.token!=null,
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
