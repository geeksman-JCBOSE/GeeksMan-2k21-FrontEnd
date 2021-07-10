import React,{useEffect,useState} from "react";
import image from "../images/image.jpeg";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import axios from 'axios';

function Aboutprofilecard(props) {
  
 const [pageno,setpageno]=useState(1);
 const [memberz,setmemberz]=useState([])
 let maxpage=1;
  useEffect(()=>{
    const fetchMembers=async()=>{
      let axiosConfig={
        headers:{
          'Content-Type':'application/json',
        },
      };
      axios.get(
        `${process.env.REACT_APP_PUBLIC}getmember?pno=${pageno-1}`,
        axiosConfig
        ).then(async(res)=>{
          maxpage=Math.ceil( parseInt(res.data.totalmembers)/parseInt(res.data.imageperpage))
          setmemberz([...res.data.members])
        }).catch(err=>{
          console.log(err)
        })
  
    }
    fetchMembers();
  },[pageno])


  var members = (
    <>
      { memberz.length>0 && memberz.map((member, index) => (
        <>
          <div class="card" style={{width:'18rem'}}>
            <div class="banner">
              <img src={member.image} />
            </div>
            <div class="menu"></div>
            <h2 class="name">{member.name}</h2>
            <div class="title">{member.post}</div>
            <div className="branch">
              <span>
                <b>Year</b>:-{member.year} <br/>
              </span>
            </div>
            <div className="sociallinks">
              <span>
                <b>Social</b>:-&nbsp;&nbsp;
              </span>
              <Link to={member.facebook} className="github">
                <i class="fab fa-github" aria-hidden="true"></i>
              </Link>
              <Link to={member.instagram} className="insta">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to={member.linkedin} className="linkedin">
                <i class="fab fa-linkedin"></i>
              </Link>
            </div>
            <div class="actions"></div>
          </div>
        </>
      ))}
    </>
  );

  return (
    <>
    <div className="members__main" >
    <div className="members__content">
      {members}
    
    </div>
    <div style={{marginBottom:'5px'}} >
    <button className={`${pageno==1?'memberbtndisable':'memberbtn'}`} disabled={pageno==1} onClick={()=>setpageno(prev=>prev-1)} >Prev</button>
      <button className={`${pageno==maxpage?'memberbtndisable':'memberbtn'}`} disabled={ pageno==maxpage} onClick={()=>setpageno(prev=>prev+1)} >Next</button>
      </div>
    </div>
   
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    member: state.about.memberdata,
  };
};

export default connect(mapStateToProps)(Aboutprofilecard);
