import React from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import {useHistory} from 'react-router-dom'
function Modal(props) {
  const [open, setOpen] = React.useState(true);
  const [email,setEmail] = React.useState("");
  const history=useHistory()
  const handleClose = (e) => {
    e.preventDefault();
    if(props.field!==""){
      props.changePassword(email);
    }
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open && props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.heading}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
          {(props.field!=="")?<TextField
            autoFocus
            margin="dense"
            id="name"
            label={props.field}
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            fullWidth
          />:<></>}
        </DialogContent>
        <DialogActions>
          {props.confirm === "false" ? (
            <Button onClick={e=>handleClose(e)} color="primary" autoFocus>
              Agree
            </Button>
          ) : (
            <>
              <Button onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={()=>{
                if(props.page==="login")
                history.push("/login")
                else if(props.page==="/userpanel")
                history.push("/userpanel")}} color="primary" autoFocus>
                Agree
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (email) => {
      dispatch(actions.changePassword(email));
    },
    postUser: (name, newemail, newpassword) => {
      dispatch(actions.postUser(name, newemail, newpassword));
    },
  };
};

export default connect(null,mapDispatchToProps)(Modal);
