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
        let ms=this.props.starttimems-(Date.now())
        if(ms<=0){
            if(this.props.changecardbtn){
                this.props.changecardbtn()

            }
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
    render(){
        return (
            <div className="contest-timer">
            {!this.state.islive&&(this.state.days+'d '+this.state.hours+'h '+this.state.minutes+'m '+this.state.seconds+'s ')}
            </div>
        )
    }
}

export default Timer