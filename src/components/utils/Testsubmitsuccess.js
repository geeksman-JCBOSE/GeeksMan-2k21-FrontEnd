import React from 'react'
import { useHistory } from 'react-router'

const Testsubmitsuccess = () => {
    const history=useHistory()
    const handleclick=()=>{
        history.push('/')
    }
    return (
        <div className="success-container">
            <div class="successcard">
      <div style={{borderRadius:'200px', height:'200px', width:'200px', background: '#F8FAF5', margin:'0 auto'}}>
        <i class="checkmark">✓</i>
      </div>
        <h1>Success</h1> 
        <p>Your test has been submitted successfully<br/><button className="returnbtn" onClick={handleclick}>Return to Home</button></p>
      </div>
        </div>
    )
}

export default Testsubmitsuccess
