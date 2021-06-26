import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import { NavLink, Link } from "react-router-dom";
import Geeksman from "./images/png/geeksman.png";
import "bootstrap/js/src/collapse.js";

const Navbar = (props) => {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
                <div>
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
