import React from 'react'
import { useHistory } from 'react-router'

const Testsubmitsuccess = () => {
    const history=useHistory()
    const handleclick=()=>{
        history.push('/')
    }
    return (
        <div>
            <h1>Test submitted</h1>
            <div onClick={handleclick}>
                  Go to HomePage
            </div>
        </div>
    )
}

export default Testsubmitsuccess
