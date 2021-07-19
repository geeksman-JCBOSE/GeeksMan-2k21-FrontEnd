import React from 'react'
import Divider from "@material-ui/core/Divider";
function Participation({contestname,rank,marks}) {
    return (
        <div className="participationcard">
            <div className="upperhalf">
              <h4>{contestname}</h4>
            </div>
            
            <div className="lowerhalf">
              <div className="rankinfo">
                Rank:<span>&nbsp;{rank}</span>
              </div>
              <div className="marksinfo">
                Marks:<span>&nbsp;{marks}</span>
              </div>
            </div>
        </div>
    )
}

export default Participation
