import React,{Component} from 'react';
import ContestsHome from './ContestsHome';
import Navbar from '../Navbar';
import Loader from '../Loader/Loader'
import { connect } from "react-redux";
import Chatbox from '../AdminSupport/Chatbox'
class Contests extends Component {
 
  render(){
    return (
        <div className="contests-container" >
          {this.props.loading&&(
            <Loader/>
          )}
          <Navbar/>
          <div className="contests">
            <ContestsHome/>
          </div>
          <Chatbox/>
          </div>
    );
}
}
  const mapStateToProps = (state) => {
    return {
      loading:state.contest.loading,
    };
  };
  export default connect(mapStateToProps, null)(Contests);