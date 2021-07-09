import React,{Component,Suspense} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import NotFound from "./NotFound";
import Contact from "./contact";
import Svg from './utils/Svg'
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import Loader from './Loader/Loader'
import Testsubmitsuccess from './utils/Testsubmitsuccess'
const UserPanel=React.lazy(()=> import("./userpanel/userpanel"));
const ContestHome=React.lazy(()=>import('./Contest/ContestHome'))
const ContestProblem=React.lazy(()=>('./questionpage/Questiondrawer'))
const ContestRegister=React.lazy(()=>("./Contest/ContestRegister"));
const Contests =React.lazy(()=>import('./Contest/Contests'))
const About =React.lazy(()=>import('./About'))
const LoginPage =React.lazy(()=>import("./HomePage/loginpage"));
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
      <Suspense fallback={<Svg/>}>
      <BrowserRouter>
        {this.props.isAuthenticated ? (
          <Switch>
            <Route exact path="/"><HomePage/></Route>
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
      </Suspense>
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
