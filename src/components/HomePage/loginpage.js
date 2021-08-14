import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Modal from "../utils/modals/modal";
import { Redirect } from "react-router-dom";
import geeksman from "../images/png/geeksman.png";
import Loader from "../Loader/Loader";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class LoginPage extends Component {
  state = {
    activeClass: "container",
    email: "",
    password: "",
    newemail: "",
    newpassword: "",
    validatenewpassword: "",
    name: "",
    success: false,
    alert: "",
    modal: false,
    modalmessage: "",
    modalheader: "",
    field: "",
    loader: false,
  };

  signInShow = (e) => {
    e.preventDefault();
    this.setState({ activeClass: "container" });
  };

  signUpShow = (e) => {
    e.preventDefault();
    this.setState({ activeClass: "container active" });
  };

  setLogin = (e) => {
    e.preventDefault();
    if (this.state.email === "") {
      this.setState({
        alert: "Please Enter Email",
        success: true,
      });
    } else if (this.state.password === "") {
      this.setState({
        alert: "Please Enter Password",
        success: true,
      });
    } else {
      this.props.reduxLogin(this.state.email, this.state.password);
      this.setState({ loader: true });
    }
  };

  handleClose = () => {
    this.setState({ success: false });
  };

  handleForgetPassword = () => {
    this.setState({
      modal: true,
      modalmessage:
        "Please type your emailaddress associated with your account, we will send an email to you, check your email inbox to reset your password. If you are unable to find the reset email please check your spam folder.",
      modalheader: "Reset your password",
      field: "Type Your Email",
    });
  };

  errorHandle = () => {
    this.setState({ success: true, alert: "Wrong id/Password" });
  };
  setShow=()=>{
    this.setState({
      modal:!this.state.modal
    })
  }
  setSignup = (e) => {
    e.preventDefault();
    var mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var passwordformat = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;

    if (this.state.name === "") {
      this.setState({ alert: "Enter Valid Name", success: true });
      console.log("enter name");
    } else if (!this.state.newemail.match(mailformat)) {
      this.setState({ alert: "Enter Valid Email", success: true });
    } else if (this.state.newpassword === "") {
      this.setState({ alert: "Enter Password", success: true });
    } else if (!this.state.newpassword.match(passwordformat)) {
      this.setState({
        alert: "Password must be minimun 8 digits with atleast 2 numericals",
        success: true,
      });
    } else if (this.state.validatenewpassword === this.state.newpassword) {
      this.props.postUser(
        this.state.name,
        this.state.newemail,
        this.state.newpassword
      );

    } else {
      this.setState({ alert: "Password doesnot match", success: true });
    }
  };

  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated){
      authRedirect = <Redirect to="/contests" />;
    }
    return (
      <>
        {this.props.authloading || this.props.signuploading ? <Loader /> : <></>}
        <div className="section">
          <div class={this.state.activeClass}>
            <div class="user signinBx">
              <div class="imgBx">
                <img src={geeksman} alt="" />
              </div>
              <div class="formBx">
                <form>
                  <h2>Sign In</h2>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                      this.setState({
                        email: e.target.value,
                      })
                    }
                    value={this.state.email}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      this.setState({
                        password: e.target.value,
                      })
                    }
                    value={this.state.password}
                  />
                  <input
                    onClick={(e) => this.setLogin(e)}
                    type="submit"
                    name=""
                    value="Login"
                  />
                  <br />
                  <p class="signup">
                    <a href="#" onClick={(e) => this.handleForgetPassword(e)}>
                      Forgot your password?
                    </a>
                  </p>

                  <p class="signup">
                    Don't have an account ?
                    <a href="#" onClick={(e) => this.signUpShow(e)}>
                      Sign Up
                    </a>
                  </p>
                </form>
              </div>
            </div>
            <div class="user signupBx">
              <div class="formBx">
                <form>
                  <h2>Create an account</h2>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) =>
                      this.setState({
                        name: e.target.value,
                      })
                    }
                    value={this.state.name}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                      this.setState({
                        newemail: e.target.value,
                      })
                    }
                    value={this.state.newemail}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      this.setState({
                        newpassword: e.target.value,
                      })
                    }
                    value={this.state.newpassword}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) =>
                      this.setState({
                        validatenewpassword: e.target.value,
                      })
                    }
                    value={this.state.validatenewpassword}
                  />
                  <input
                    onClick={(e) => this.setSignup(e)}
                    type="submit"
                    name=""
                    value="Sign Up"
                  />
                  <p class="signup">
                    Already have an account ?
                    <a href="#" onClick={(e) => this.signInShow(e)}>
                      Sign In
                    </a>
                  </p>
                </form>
              </div>
              <div class="imgBx">
                <img src={geeksman} alt="" />
              </div>
            </div>
          </div>
        </div>
        {authRedirect}

        <Snackbar
          open={this.state.success}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            {this.state.alert}
          </Alert> 
        </Snackbar>
        <Modal
          show={this.state.modal}
          setShow={this.setShow}
          message={this.state.modalmessage}
          confirm="false"
          heading={this.state.modalheader}
          field={this.state.field}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reduxLogin: (email, password) => {
      dispatch(actions.reduxLogin(email, password));
    },
    postUser: (name, email, password) => {
      dispatch(actions.postUser(name, email, password));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    forgetstatus: state.auth.forgetstatus,
    error: state.auth.autherror,
    errorauth: state.auth.autherror !== null,
    authloading: state.auth.loading,
    signuploading:state.user.loading,
    posterror: state.user.posterror,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
