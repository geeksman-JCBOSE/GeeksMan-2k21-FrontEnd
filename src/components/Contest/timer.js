import React from 'react'


class Timer extends React.Component{
    state={
        days:null,
        hours:null,
        minutes:null,
        seconds:null,
        intervalid:null,
        islive:null
    }
    componentDidMount(){
        let intervalid=setInterval(this.computetime.bind(this),1000)
        this.setState({intervalid})
        }
    computetime(){
        let ms=new Date(this.props.starttime)-(Date.now())
        if(ms<=0){
            this.setState({islive:true})
            clearInterval(this.state.intervalid)
        }
        let days = Math.floor(ms / (24*60*60*1000));
        let daysms=ms % (24*60*60*1000);
        let hours = Math.floor((daysms)/(60*60*1000));
        let hoursms=ms % (60*60*1000);
        let  minutes = Math.floor((hoursms)/(60*1000));
        let minutesms=ms % (60*1000);
        let sec = Math.floor((minutesms)/(1000));
        this.setState({
            days:days,
            hours:hours,
            minutes:minutes,
            seconds:sec
          })
    }
    componentDidUpdate(){

    }
    render(){
        return (
            <div className="contest-timer">
             {this.state.islive&&(
                 <h5>Contest is Live&nbsp;!</h5>
             )}
             
            {!this.state.islive&&('Starts in:- '+this.state.days+'days '+this.state.hours+'hours '+this.state.minutes+'minutes '+this.state.seconds+'seconds')}
            </div>
        )
    }
}

export default Timer