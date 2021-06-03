import React,{Component} from 'react';
import ContestsHome from './ContestsHome';
import Navbar from '../Navbar';
import Loader from '../Loader/Loader'
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class Contests extends Component {

   componentDidMount(){
   this.props.getContest()
  }
  render(){
    return (
        <div>
          {this.props.loading&&(
            <Loader/>
          )}
         <div className="contests-container">
          
          <div className="contests">
              <Navbar />
               {!this.props.loading&&(
               <ContestsHome/>
               )}
          </div>
          </div>
          </div>
       
    );
}
}
const mapDispatchToProps = (dispatch) => {
    return {
      getContest:()=>{
        dispatch(actions.getContest());
      }

    };
  };
  const mapStateToProps = (state) => {
    return {
      data: state.contest.contestdata,
      loading:state.loading.loading
    };
  };



  export default connect(mapStateToProps, mapDispatchToProps)(Contests);