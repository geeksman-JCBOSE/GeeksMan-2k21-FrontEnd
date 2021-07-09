import React,{Component} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Contests from "./Contest/Contests";
import About from "./About";
import LoginPage from "./HomePage/loginpage";
import NotFound from "./NotFound";
import Contact from "./contact";
import UserPanel from "./userpanel/userpanel";
import { connect } from "react-redux";
import ContestHome from './Contest/ContestHome'
import * as actions from "../store/actions/index";
import Loader from './Loader/Loader'
import ContestProblem from './questionpage/Questiondrawer'
import Testsubmitsuccess from './utils/Testsubmitsuccess'
import ContestRegister from "./Contest/ContestRegister";
import Svg from './utils/Svg'
class MainLayout extends Component {
  componentDidMount(){
    
  }
  render(){
    if(this.props.isAuthenticated){
      this.props.getUser(this.props.userid)
    }
    this.props.authCheckStatus(); 
  return (
    <div className="main-layout">
      <BrowserRouter>
        {this.props.isAuthenticated ? (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route exact path="/contests" component={Contests} />
            <Route path="/about" component={About} />
            <Route path="/userpanel" component={UserPanel} />
            <Route path="/contact" component={Contact} />
            <Route path="/loader" component={Loader} />
            <Route path="/contests/register/:cid" component={ContestRegister}/>
            <Route path="/contest/:cname/questions" component={ContestProblem}/>
            <Route path="/contests/:cname" component={ContestHome}/>
            <Route path="/submit" component={Testsubmitsuccess}/>
            <Route path="*" component={NotFound} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/svg" component={Svg}/>
            <Route path="/contests/register/:cid" component={ContestRegister}/>
            <Route path="/login" component={LoginPage} />
            <Route exact path="/contests" component={Contests} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          <Route path="/loader" component={Loader}/>
            <Route path="*" component={NotFound} />
          </Switch>
        )}
      </BrowserRouter>
    </div>
  );
        }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContest: () => {
      dispatch(actions.getContest());
    },
    authCheckStatus: () => {
      dispatch(actions.authCheckStatus());
    },
    getUserContest: (userid) => {
      dispatch(actions.getUserContest(userid));
    },
    getUser: (userid) => {
      dispatch(actions.getUser(userid));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token!==null,
    userid:state.auth.userid
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(MainLayout);
