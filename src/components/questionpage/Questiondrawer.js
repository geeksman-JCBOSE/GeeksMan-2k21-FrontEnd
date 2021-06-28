import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import QuestionIcon from "@material-ui/icons/QuestionAnswerTwoTone";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import DoneIcon from "@material-ui/icons/Done";
import Button from "@material-ui/core/Button";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Modal from "../utils/modals/modal";
import Loader from '../Loader/Loader'
import {  useHistory } from "react-router-dom";

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar:{
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedindex, setselected] = React.useState(0);
  const [activequestion, setactivequestion] = React.useState(
    JSON.parse(localStorage.getItem('Questions')).questions[0]
  );
  const [tickicon, setTickicon] = React.useState(
    <DoneIcon style={{ color: "green" }} />
  );
  const [value, setValue] = React.useState(null);
  // const [savedindex, setSavedindex] = React.useState(null);
  const [hour, setHour] = React.useState(-1);
  const [minutes, setMinutes] = React.useState(-1);
  const [seconds, setSeconds] = React.useState(-1);
  const [show, setShow] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [message,setMessage] = React.useState("");
  const [confirmbutton,setConfirmbutton] =React.useState("");
// history for redirecting to submit page
  const history=useHistory()
  const redirecttosubmit=()=>{
    history.push('/submit')
  }

  const handleTestEnd = () => {
    setRedirect(true);
  };

  //shows the selected option by the user
  useEffect(()=>{
  let myarray=JSON.parse(localStorage.getItem('submission')).answers
  console.log(myarray)

  if( myarray.length!=0){
  const idx=myarray.findIndex(question=>question.id==activequestion._id)
   if(idx!=-1){
     setValue(myarray[idx].value)
   }else{
     setValue(null)
   }
  }
  },[selectedindex])

  //Mobile Screen
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // get Questions
  useEffect(() => {
    // var countDownIs = new Date().getTime();
    var countDownDate=JSON.parse(localStorage.getItem('endtime')).endtime
    console.log(JSON.parse(localStorage.getItem('endtime')).endtime)
    // Update the count down every 1 second
    var x = setInterval(function () {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHour(hours);
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(minutes);
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setSeconds(seconds);
      // Output the result in an element with id="demo"

      // If the count down is over, write some text
      if (hours === 0 && seconds === 0 && minutes === 0) {
        clearInterval(x);
        handePostForce();
        
      }
    }, 1000);
  }, []);

  //Submit Button
  const handlePostQuestions = () => {
    setShow(prev=>!prev);
    setConfirmbutton("true");
    setMessage("Are you sure you want to submit your test?")
  };
 
  // Post questions by timer
  const handePostForce=()=>{
    props.postQuestions(JSON.parse(localStorage.getItem('Testtoken')).token,JSON.parse(localStorage.getItem('submission')).answers,redirecttosubmit)
    setShow(true);
    setConfirmbutton("false");
    setMessage("The time has ended your test has been successfully submitted!")
  }
  const handlepostquestions=()=>{
    console.log('submitted')
     props.postQuestions(JSON.parse(localStorage.getItem('Testtoken')).token,JSON.parse(localStorage.getItem('submission')).answers,redirecttosubmit)
  }
  // Load Selection of Radio Buttons
  const createSelection = (e, value) => {
    setValue(e.target.value);
  };


  //clear the selected option 
  const removesubmission=()=>{
     const myarray=JSON.parse(localStorage.getItem('submission')).answers
     if(myarray.length!==0){
       const idx=myarray.findIndex(question=>question.id==activequestion._id)
       if(idx!=-1){
         myarray.splice(idx,1)
       }
       localStorage.setItem('submission',JSON.stringify(
         {
           answers:myarray
         }
       ))
       setValue(null)
     }
  }

  // Handle Previous Button
  const handlePrev = (e) => {
    e.preventDefault();
    // handleFindValue(activequestion._id);
    if (selectedindex !== 0) {
      setselected(selectedindex - 1);
      setactivequestion(JSON.parse(localStorage.getItem('Questions')).questions[selectedindex - 1]);
    }
  };
   
  //Handle Next Button
  const handleNext = (e) => {
    e.preventDefault();
    // handleFindValue(activequestion._id);
    var len = JSON.parse(localStorage.getItem('Questions')).questions.length - 1;
    if (selectedindex !== len){
      setselected(selectedindex + 1);
      setactivequestion(JSON.parse(localStorage.getItem('Questions')).questions[selectedindex+1]);
    }
  };
  // Handle Green Tick
  const handleGreenTick = (_id) => {
    let myArray = [];
    if (localStorage.getItem('submission') !== null) {
      myArray = JSON.parse(localStorage.getItem('submission')).answers;
    }
    let help
    if(myArray.length!=0)
     help = myArray.findIndex((question) => question.id === _id);
    else 
    return false
    if(help!=-1){
      return true;
    }
    return false
  };

  const handleanswerclick=(_id,value)=>{
      let answers=JSON.parse(localStorage.getItem('submission')).answers
      if(answers.length===0){
        answers.push({id:_id,value})
      }else{
      let idx=answers.findIndex(answer=>answer.id===_id)
      if(idx!=-1){
           answers[idx].value=value
      }else{
        answers.push({id:_id,value})
      }
    }
    localStorage.setItem('submission',JSON.stringify({
      answers
    }))
  }
  //Drawer Map
  var drawer = (
    <div>
      <div className={classes.toolbar} />
      <ListItem>
        <ListItemText primary="Demo Test" secondary={Date()} />
      </ListItem>
      <Divider />
      <List>
        {JSON.parse(localStorage.getItem('Questions')).questions.map((question, index) => (
          <React.Fragment>
            <ListItem
              button
              alignItems="center"
              index={index}
              selected={selectedindex === index}
              key={question._id}
              onClick={() => {
                setactivequestion(question);
                setselected(index);
              }}
            >
              <ListItemIcon>
                {" "}
                <QuestionIcon />{" "}
              </ListItemIcon>
              <ListItemText center primary={"Question-" + parseInt(index+1)} />
              <ListItemIcon>
                {localStorage.getItem('submission')&&handleGreenTick(question._id)&&(
                  tickicon
               )}
              </ListItemIcon>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
  //Timer

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root} style={{backgroundColor:`${getComputedStyle(document.documentElement).getPropertyValue('--homebackground')}`,height:'100vh'}} >
      {props.loading&&(
         <Loader/>
      )}
     
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <div className="questionpageheader">
              <div className="timeinfo">
                <span>
                  {hour}hr {minutes}min {seconds}sec
                </span>
              </div>

              <div className="row prevnextbtn">
                <div className="col-sm-4 hidden">
                  <Button
                    color="danger"
                    variant="contained"
                    disabled={selectedindex===0}
                    style={selectedindex===0?{color: 'rgba(0, 0, 0, 0.87)',
                      boxShadow:' 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                      backgroundColor:'#e0e0e0',opacity:'.4'}:null}
                    onClick={(e) => handlePrev(e)}
                  >
                    &larr; prev
                  </Button>
                </div>
                <div className="col-sm-4 hidden">
                  <Button
                    variant="contained"
                    color="danger"
                    disabled={selectedindex===JSON.parse(localStorage.getItem('Questions')).questions.length-1}
                    style={selectedindex===JSON.parse(localStorage.getItem('Questions')).questions.length-1?{color: 'rgba(0, 0, 0, 0.87)',
                    boxShadow:' 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                    backgroundColor:'#e0e0e0',opacity:'.4'}:null}
                    onClick={(e) => handleNext(e)}
                  >
                    next &rarr;
                  </Button>
                </div>
                <div className="col-sm-4 next-button">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => handlePostQuestions(e)}
                    className="submit-button"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          <div className="mainquestion">
            <p>
              <span><b>Question{selectedindex+1}</b>&nbsp;&nbsp;</span>
              {activequestion.question}
            </p>
          </div>
          <div className="optionsselect">
            <FormControl component="fieldset">
              <RadioGroup aria-label="Questions" name="Question" value={value} >
                {
                  activequestion.options.map((option)=>{
                    return   <FormControlLabel
                    onInput={()=>handleanswerclick(activequestion._id,option.value)}
                    value={option.value}
                    control={<Radio onClick={(e) => createSelection(e)} />}
                    label={option.value}
                  />
                  })
                }
              </RadioGroup>
              <br />
              <br />
              <div className="row">
                <div className="column50">
                  <div className="row">
                  
                    <div className="col-sm-6">
                      <button
                        onClick={removesubmission}
                        className="clear-button"
                      >
                        Clear Choice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </FormControl>
          </div>
        </Typography>
      </main>
      {/* {authRedirect} */}
      <Modal
        setShow={setShow}
        show={show}
        message={message}
        header="Caution!"
        field=""
        confirm={confirmbutton}
        handlepostquestions={handlepostquestions}
        redirect={(e) => handleTestEnd()}
      />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQuestions: (token) => {
      dispatch(actions.getQuestions(token));
    },
    postQuestions: (token, data,redirecttosubmit) => {
      dispatch(actions.postQuestions(token, data,redirecttosubmit));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    questiondata: state.question.questionsdata,
    contesttoken: state.contest.contesttoken,
    contestdata:state.contest.contestdata,
    loading:state.starttestloading.loading
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);