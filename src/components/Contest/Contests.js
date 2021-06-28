import React,{Component} from 'react';
import ContestsHome from './ContestsHome';
import Navbar from '../Navbar';
import Loader from '../Loader/Loader'
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
class Contests extends Component {
  componentDidMount(){
  //  this.props.getregisteredcontest(this.props.uid)
   this.props.getContest(this.props.token)
  }
  render(){
    return (
        <div className="contests-container" >
          {this.props.loading&&(
            <Loader/>
          )}
          <Navbar/>
       
          <div className="contests">
              
               {!this.props.loading&&(
               <ContestsHome/>
               )}
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
      getregisteredcontest:(uid)=>{
        dispatch(actions.getregisteredContest(uid))
      }
    };
  };
  const mapStateToProps = (state) => {
    return {
      token:localStorage.getItem('userdata')?JSON.parse(localStorage.getItem('userdata')).token:null,
      data: state.contest.contestdata,
      loading:state.loading.loading,
      uid:localStorage.getItem('userdata')?JSON.parse(localStorage.getItem('userdata')).userid:null
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Contests);