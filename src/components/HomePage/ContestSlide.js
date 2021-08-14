import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const ContestSlide = (props) => {
  return (
    <div className="contest-slide container-fluid">
      <div className="contest-box-container">
        {props.data.length!==0&&(
    <div>
   <div className="contest-title">{props.data[0].contestname}</div>
        <div className="contest-timing">
    Starts At:  {(new Date(props.data[0].starttime)).toLocaleString()}<br />
    Ends At: {(new Date(props.data[0].endtime)).toLocaleString()}
  </div>
  <br/>
  <Link className="standard-btn" to="/contests">Register</Link>
  </div>
        )}
        {props.data.length===0&&(
          <div>There are no upcoming contests</div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated :state.auth.token!==null,
    data: state.contest.contestdata,
  };
};

export default connect(mapStateToProps,null)(ContestSlide);