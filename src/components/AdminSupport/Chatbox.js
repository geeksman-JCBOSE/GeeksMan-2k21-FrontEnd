import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import './Chatbox.css'
import { v4 as uuidv4 } from 'uuid';
const Chatbox = () => {

        const [active,setactive]=useState(localStorage.getItem('roomid')?true:false)
        const [messages,setmessages]=useState([])
        const [Roomid,setroomid]=useState(localStorage.getItem('roomid')?JSON.parse(localStorage.getItem('roomid')).id:null)
        const [socket,setsocket]=useState(null)
        const [connecting,setconnecting]=useState(false)
        function send() {
          var msg = document.getElementById("message").value;
          if (msg == "") return;
          addMsg(msg);
        }
        const addMsg=(msg) =>{
            setmessages([...messages,msg])
          document.getElementById("message").value = "";
          document.getElementById("message-box").scrollTop = document.getElementById(
            "message-box"
          ).scrollHeight;
        }
        const addResponseMsg=(msg) =>{
          var div = document.createElement("div");
          div.innerHTML = "<div className='chat-message-received'>" + msg + "</div>";
          div.className = "chat-message-div";
          document.getElementById("message-box").appendChild(div);
          document.getElementById("message-box").scrollTop = document.getElementById(
            "message-box"
          ).scrollHeight;
        
        }
        
     const handleenter=(event)=>{
        if (event.keyCode === 13) {
            event.preventDefault();
            send();
          }
     }

const handlechatswitch=()=>{
    console.log('clicked')
        if (document.getElementById("chatbot").classList.contains("card__collapsed")) {
          document.getElementById("chatbot").classList.remove("card__collapsed")
          if(active){
          document.querySelector('.activechat').classList.contains('activechatcollapsed')
          document.querySelector('.activechat').classList.remove('activechatcollapsed')
          }
          document.getElementById("chatbot_toggle").children[0].style.display = "none"
          document.getElementById("chatbot_toggle").children[1].style.display = ""
          if(!active&&!connecting)
          document.querySelector('.chathelpbtn button').classList.remove('collapsed__button')
        }
        else {
          document.getElementById("chatbot").classList.add("card__collapsed")
          if(active)
          document.querySelector('.activechat').classList.add('activechatcollapsed')
          if(!active&&!connecting)
          document.querySelector('.chathelpbtn button').classList.add('collapsed__button')
          document.getElementById("chatbot_toggle").children[0].style.display = ""
          document.getElementById("chatbot_toggle").children[1].style.display = "none"
        }
}

useEffect(()=>{
  if(Roomid){
  const socket=io("http://localhost:5000/reconnecting")
  socket.emit("join-room",Roomid)
  setsocket(socket)
  }
},[])


const connecttosupport=()=>{
  let roomid;
  if(!localStorage.getItem('roomid')){
    roomid=uuidv4()
    setconnecting(true)
    const socket=io("http://localhost:5000/firstconnection")
    socket.emit('join-room',roomid)
    socket.on('joined',(res)=>{
      if(res==='successfull'){
        localStorage.setItem('roomid',JSON.stringify({
          id:roomid
          }))
          setactive(true)
          setroomid(roomid) 
          setconnecting(false)  
      }
    })
}
}
    return (
        <div className="chat__container">
<div id="chatbot" className="main-card card__collapsed">
  <button id="chatbot_toggle" onClick={handlechatswitch}>
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 4v7H5.17l-.59.59-.58.58V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{display:"none"}}><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
  </button>
  <div className="main-title">
    <div className="chat__header">
    
    <span style={{whiteSpace:"nowrap"}}>GeeksMan Support</span>

  </div>
  </div>
  {!active&&!connecting&&(
  <div className="chathelpbtn">
  <button className="collapsed__button" onClick={connecttosupport}>Ask for help</button>
</div>
  )}
  {!active&&connecting&&(
    <div className="chathelpbtn" style={{color:'black',fontSize:'2rem'}}>
      connecting...........
    </div>
  )}
 
  {active&&(
 <div className="activechat activechatcollapsed">
 <div className="chat-area" id="message-box">
     {messages.map(message=>{
         return <div className="chat-message-div"> 
                <span style={{flexGrow:'1'}}></span>
                <div className='chat-message-sent'>{message}</div>
             </div>
     })}
 </div>
 <div className="line"></div>
 <div className="input-div">
   <input className="input-message" name="message" type="text" id="message" placeholder="Type your message ..."  onKeyUp={(e)=>{handleenter(e)}} />
   <button className="input-send" onClick={send}>
     <svg style={{width:'24px',height:'24px'}}>
       <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
     </svg>
   </button>
  </div>
 </div>
  )}
 
  
 

  </div>
  
  </div>
    )
}

export default Chatbox
