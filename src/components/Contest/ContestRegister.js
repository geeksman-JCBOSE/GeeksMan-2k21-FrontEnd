import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "axios";
import ContestHeader from "./ContestHeader";
import Modal from "../utils/modals/modal";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar";
import Timer from "./timer";
const ContestRegister = (props) => {
  const contestid = useParams().cid;
  const history = useHistory();
  const [contestdata, setcontestdata] = useState(null);
  const [show, setshow] = useState(false);
  const [message, setmesssage] = useState("");
  const [page, setpage] = useState("");
  const [loading, setloading] = useState(true);
  const [islive,setislive]=useState(false)
  useEffect(() => {
    console.log(contestid, props.userdata.token);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${props.token}`,
      },
    };
    axios
      .get(process.env.REACT_APP_PUBLIC + `/contest/${contestid}`, axiosConfig)
      .then((res) => {
        console.log(res.data.contest);
        setloading(false);
        if(Date.now()>new Date(res.data.contest.starttime).getTime()){
            setislive(true)
        }
        setcontestdata(res.data.contest);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
      });
  }, []);
  const handleActiveContest = (e, userid, id) => {
    e.preventDefault();
    if (props.isAuthenticated) {
      if (
        props.userdata.college === null ||
        props.userdata.phoneno === null ||
        props.userdata.year === null ||
        props.userdata.Branch === null
      ) {
        setshow(true);
        setmesssage(
          "You have to complete your details before registering for any contest"
        );
        setpage("userpanel");
      } else {
        props.registerContest(userid, id);
      }
    } else {
      setshow(true);
      setmesssage("Please Login First");
      setpage("login");
    }
  };
  const redirect = () => {
    history.replace(`/${page}`);
  };

  const handlestartclick=()=>{
    history.push({
      pathname:`/contests/${contestdata.contestname}`,
      search:`?id=${contestid}`,
    })
  }
  return (
    <div className="contest-page">
      {(loading || props.loading) && <Loader />}
      <Navbar />
      <div id="contest-home">
        <ContestHeader content="Contest Details" />
        <div className="row contest-registerpage-header">
          <div className="col-md-4" style={{ paddingLeft: "6rem" }}>
             {islive&&contestdata&&Date.now()<new Date(contestdata.teststarttime).getTime()&&(
                 <div className="contest-register-page-timer">
                  Registration is over
                  </div>
             )}
             {islive&&contestdata&&Date.now()>=new Date(contestdata.teststarttime).getTime()&&Date.now()<new Date(contestdata.testendtime).getTime()&&(
                  <div className="contest-register-page-timer">
                  This contest is live
                  </div>
             )}
             {!islive&&contestdata&&(
                <div className="contest-register-page-timer">
                Registration ends after:&nbsp;
                <Timer starttimems={contestdata.starttime} />
              </div>
             )}
          </div>
          <div className="col-md-2 ">
            <b>Venue</b>:&nbsp;{contestdata ? contestdata.venue : ""}
          </div>
          <div className="cold-md-2 ">
            <b>Registration Fee</b>:&nbsp;
            {contestdata
              ? contestdata.fees === 0
                ? "Free"
                : contestdata.fees+' INR'
              : ""}
          </div>
        </div>
        <div className="row">
          <div className="col-md-7" style={{ paddingLeft: "6rem" }}>
            <div className="contest-name">
              {contestdata ? contestdata.contestname : null}
            </div>
            <div className="contest-remaining-time">
              The contest will start at{" "}
              {contestdata
                ? new Date(contestdata.starttime).toLocaleString()
                : null}{" "}
            </div>
            <div className="contest-instructions-container">
              <div className="contest-instructions-heading">About Contest</div>
              <div className="contest-instructions">
                {contestdata ? contestdata.contestdetail : null}
              </div>
            </div>
          </div>
          <div className="col-md-5">
           {contestdata&&contestdata.isregistered&&islive&&(Date.now()<(new Date(contestdata.teststarttime).getTime()))&&(
                  <div className="contest-card-register-button">
                  Registered
                 </div>
            )}  
            {!islive&&contestdata&&!contestdata.isregistered&& (
              <button
                className="contest-register-button"
                onClick={(e) =>
                  handleActiveContest(e, props.userdata.id, contestid)
                }
              >
                Register Now
              </button>
            )}
            {contestdata&&contestdata.isregistered&&islive&&(!contestdata.testgiven)&&(Date.now()>=new Date(contestdata.teststarttime).getTime()&&Date.now()<new Date(contestdata.testendtime).getTime())&&(
                <button
                className="contest-register-button"
                onClick={(e) =>
                  handlestartclick()
                }
              >
                Start Now
              </button>
            )}
          </div>
        </div>
        <Modal
          show={show}
          setShow={setshow}
          message={message}
          confirm="true"
          heading="Error Correction"
          field=""
          redirect={redirect}
        />
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    registerContest: (userid, contestid) => {
      dispatch(actions.registerContest(userid, contestid));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading.loading,
    token:localStorage.getItem('userdata')?JSON.parse(localStorage.getItem('userdata')).token:null,
    userdata: state.user.userdata,
    registeruserdata: state.contest.registeruserdata,
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContestRegister);
