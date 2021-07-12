import React,{Component} from 'react';
import ContestsHome from './ContestsHome';
import Navbar from '../Navbar';
import Loader from '../Loader/Loader'
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
class Contests extends Component {
  componentDidMount(){
  }
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
          </div>
    );
}
}

const mapDispatchToProps = (dispatch) => {
    return {
      getContest:(token)=>{
        dispatch(actions.getContest(token));
      },
    };
  };
  const mapStateToProps = (state) => {
    return {
      token:localStorage.getItem('userdata')?JSON.parse(localStorage.getItem('userdata')).token:null,
      data: state.contest.contestdata,
      loading:state.contest.loading,
      uid:localStorage.getItem('userdata')?JSON.parse(localStorage.getItem('userdata')).userid:null
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Contests);