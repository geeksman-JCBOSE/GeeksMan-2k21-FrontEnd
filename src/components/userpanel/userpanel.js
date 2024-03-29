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
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import ProfileIcon from "@material-ui/icons/AccountBox";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Participation from "./Participation";
import * as actions from "../../store/actions/index";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import {useHistory } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import Loader from "../Loader/Loader";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";

const drawerWidth = 240;

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
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
    padding: theme.spacing(3),
  },
}));

function UserPanel(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [college, setCollege] = React.useState("");
  const [year, setYear] = React.useState("");
  const [phoneno, setPhoneno] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [selectedbtn, setselectedbtn] = React.useState("homebtn");
  const history=useHistory()
  //image upload states and functions...
  const [img, setImg] = React.useState([]);
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    //  console.log(imageList, addUpdateIndex);
    setImg(imageList);
  };
  const maxNumber = 1;
  //image upload states and functions...
  useEffect(() => {
    props.getUser(props.userid);
  }, []);
  const handlePatch = (e) => {
    e.preventDefault();
    props.patchUser(
      props.userid,
      college,
      img[0]?img[0].data_url:'',
      year,
      branch,
      phoneno
    );
  };
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            setselectedbtn("homebtn");
          }}
          selected={selectedbtn === "homebtn"}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Details" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            setselectedbtn("updateprofile");
          }}
          selected={selectedbtn === "updateprofile"}
        >
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText primary="UpdateProfile" />
        </ListItem>
        <ListItem
          button
          // onClick={() => {
          //   setRedirect(true);
          // }}
          onClick={()=>{history.push('/')}}
        >
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText  primary="Return To Home" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      {props.loading && <Loader />}
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
          <Typography variant="h6" noWrap className="headinginfo">
            <h5>Welcome,</h5>
            {props.userdata&&(
              props.userdata.name
            )}
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
        {!props.loading &&props.userdata&& (
          <Typography>
            {selectedbtn === "homebtn" && (
              <div className="aboutuser">
                <div className="userinfo">
                  <div className="userimagebox">
                    <Avatar className="styleimage">
                      <img
                        src={props.userdata.profilePhotoLocation}
                        class="img-fluid mx-auto d-block"
                        alt="Responsive image"
                      />
                    </Avatar>
                  </div>
                  <div className="userinfobox">
                    <div className="nameinfo">
                      <h3>Username:<span>{props.userdata.name}</span></h3>
                    </div>
                    <div className="collegeinfo">
                      <h4>
                        College: <span>{props.userdata.college}</span>
                      </h4>
                    </div>
                    <div className="educationinfo">
                      <h4>
                        Year: <span>{props.userdata.year}</span>
                      </h4>
                      {props.userdata.Branch && (
                        <h4>
                          Branch: <span>{props.userdata.Branch}</span>
                        </h4>
                      )}
                    </div>
                  </div>
                </div>
                <div className="participationinfo">
                  <div className="participationheading">
                    <h2 className="participationheadingstyle">
                      Participation:
                    </h2>
                  </div>
                  {props.userdata.usercontestdetail &&
                  props.userdata.usercontestdetail.length === 0 ? (
                    <div className="contestinfocards">
                      <h3>
                        You haven't participated in any contest uptil now!!
                      </h3>
                    </div>
                  ) : (
                    <div className="participationcard-container">
                      {props.userdata.usercontestdetail &&
                        props.userdata.usercontestdetail.map((contest) => (
                          <Participation
                            contestname={contest.contestname}
                            rank={"1"}
                            marks={contest.marks}
                          />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedbtn === "updateprofile" && (
              <div>
                <div className="mainupdate">
                  <h1>Update Profile</h1>
                </div>
                <div className="updateform">
                  <TextField
                    id="standard-full-width"
                    label="Name"
                    style={{ margin: 8 }}
                    placeholder="Name"
                    fullWidth
                    disabled
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={props.userdata.name}
                  />

                  <div style={{margin:'8px'}}>
                    <ImageUploading
                      multiple
                      value={img}
                      onChange={onChange}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <FormLabel>Upload your image</FormLabel>
                          <br />
                          <br />
                          <button
                            className="standard-btn"
                            type="button"
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            Pick
                          </button>
                          &nbsp;
                          {imageList.map((image, index) => (
                            <div key={index} style={{}} className="image-item">
                              <img
                                style={{ marginLeft: "20px" }}
                                src={image["data_url"]}
                                alt=""
                                width="100"
                              />
                              <div className="image-item__btn-wrapper">
                                <button
                                  className="standard-btn"
                                  onClick={() => onImageUpdate(index)}
                                >
                                  Update
                                </button>
                                <button
                                  className="standard-btn"
                                  onClick={() => onImageRemove(index)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ImageUploading>
                  </div>
                  <TextField
                    Key="1"
                    id="standard-full-width"
                    label="Email"
                    style={{ margin: 8 }}
                    placeholder="Email"
                    fullWidth
                    disabled
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={props.userdata.email}
                  />

                  <TextField
                    Key="2"
                    id="standard-full-width"
                    label="College"
                    style={{ margin: 8 }}
                    placeholder="College"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                  />
                  <TextField
                   Key="3"
                    id="standard-full-width"
                    label="Year"
                    style={{ margin: 8 }}
                    placeholder="Year"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <TextField
                   Key="4"
                    id="standard-full-width"
                    label="Branch"
                    style={{ margin: 8 }}
                    placeholder="Branch"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                  <TextField
                   Key="5"
                    id="standard-full-width"
                    label="Phone No (Whatsapp)"
                    style={{ margin: 8 }}
                    placeholder="Phone No (Whatsapp)"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={phoneno}
                    onChange={(e) => setPhoneno(e.target.value)}
                  />
                  <button
                    className="standard-btn"
                    onClick={(e) => handlePatch(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </Typography>
        )}
      </main>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQuestions: (token) => {
      dispatch(actions.getQuestions(token));
    },
    postQuestions: (token, data) => {
      dispatch(actions.postQuestions(token, data));
    },
    patchUser: (uid, clg, profilePhotoLocation, yr, br, phone) => {
      dispatch(
        actions.patchUser(uid, clg, profilePhotoLocation, yr, br, phone)
      );
    },
    getUser: (userid) => {
      dispatch(actions.getUser(userid));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.token != null,
    userdata: state.user.userdata,
    loading: state.user.loading,
    usercontestdata: state.user.usercontestdata,
    userid: JSON.parse(localStorage.getItem("userdata")).userid,
    patchStatus: state.user.patchStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
