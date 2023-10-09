import React, { Component } from "react";
import CountDownTimer from "./components/CountDownTimer";

let tHours = 0;
let tMinute = 0;
let lSeconds = 0;
let trackerStart:any=null;
let stopValue=false
let chant=false

// let time = 0;
// var timeS = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const today = new Date();
const hours = today.getHours().toString().padStart(2, '0');
const minutes = today.getMinutes().toString().padStart(2, '0');
const seconds = today.getSeconds()
const timeString = hours + ":" + minutes + ":" + seconds;


export default class Signup extends Component {
  state: {
    hours: any;
    minute: any;
    seconds: any;
    punchInH: any;
    punchInM: any;
    punchOut: any;
    arrayValueIn: any;
    arrayValueOut: any;
    value: boolean;
    timeS:any;
    today:any;
    time:any;
    trackerStart: any;
    trackerStop:any;
    addHours: any,
    addMinute: any,
    addSeconds: any,
    downHour: any,
    downMinute: any,
    downSeconds: any,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      hours: today.getHours(),
      minute: today.getMinutes(),
      seconds: today.getSeconds(),
      punchInH: null,
      punchInM: null,
      punchOut: null,
      arrayValueIn: [],
      arrayValueOut: [],
      value: false,
      timeS:null,
      today:new Date(),
      time:null,
      trackerStop:null,
      trackerStart:null,
      addHours:0,
      addMinute:0,
      addSeconds:0,
      downHour: 8,
      downMinute: 59,
      downSeconds: 59,
    };
  }

  componentDidMount(): void {
    this.timer();
  }

  componentDidUpdate(prevState: Readonly<{}>) {
    if (prevState !== this.state.seconds) {
      this.timer();
    }

    if(chant===true){
      if (prevState !== this.state.downSeconds) {
        this.countDownTimer();
      }
    }
    return;

  }
 

  timer = () => {
    setTimeout(() => {
      if (this.state.seconds == 59) {
        if (this.state.minute == 59) {
          this.setState({ hours: this.state.hours + 1, minute: 0, seconds: 0 });
        } else {
          this.setState({ minute: this.state.minute + 1, seconds: 0 });
        }
      } else {
        this.setState({ seconds: this.state.seconds + 1 });
      }    
    }, 1000);
  };

  onTrackerStart=()=>{
    this.state.trackerStart = `${this.state.hours} : ${this.state.minute} : ${this.state.seconds}`
    stopValue=true;
    chant=true
  }
  
  
  onTrackerStop = () => {
    stopValue=false;
    this.setState({trackerStop:null})
    
  }

  onPunchIn = () => {
     this.state.time = `${this.state.hours} : ${this.state.minute} : ${this.state.seconds}`;
    this.state.arrayValueIn.push(this.state.time);
    this.state.punchInH = this.state.time;
    this.state.value = true;
    chant = true;
    
  };

  onPunchOut = () => {
    this.state.time = `${this.state.hours} : ${this.state.minute} : ${this.state.seconds}`;
    this.state.arrayValueOut.push(this.state.time);
    this.state.value = true;
    chant=false;

  };

  addTimer = () => {
    setTimeout(() => {
      if (this.state.addSeconds == 59) {
        if (this.state.addMinute == 59) {
          this.setState({ addHours: this.state.addHours + 1, addMinute: 0, addSeconds: 0 });
        } else {
          this.setState({ addMinute: this.state.addMinute + 1, addSeconds: 0 });
        }
      } else {
        this.setState({ addSeconds: this.state.addSeconds + 1 });
      }
    }, 1000);
  };

  countDownTimer = () => {
    setTimeout(() => {
      if (this.state.downSeconds == 0) {
        if (this.state.downMinute == 0) {
          this.setState({ downHour: this.state.downHour - 1, downMinute: 59, downSeconds: 59 });
        } else {
          this.setState({ downMinute: this.state.downMinute - 1, downSeconds: 59 });
        }
      } else {
        this.setState({ downSeconds: this.state.downSeconds - 1 });
      }
    }, 1000);
  };

 
  render() {
    return (
      <>
        <div className="mainContainer">
          <div className="navContainer">
            <div className="navItem">Tracker</div>
          </div>

          <div className="timer">
            {this.state.hours} : {this.state.minute} : {this.state.seconds}
          </div>

          <div className="content">
            <div className="button">
              <div className="trackButtons">
                <div className="buttonTracker" onClick={() => { this.onTrackerStart();  }}>
                  <div>Tracker start</div>
                  
                  <div>{stopValue == true ?  this.state.trackerStart  : ''}</div>
                </div>
                <div className="buttonTracker" onClick={this.onTrackerStop}>
                  <div>Tracker stop</div>
                  {stopValue == true ? <>{this.state.downHour} : {this.state.downMinute} : {this.state.downSeconds}</>  : ''} 
                 
                </div>

              </div>

              <div className="punchButtons">
                
                <div className="buttonPunch" onClick={this.onPunchOut}>
                  Punch out
                </div>
                <div className="buttonPunch" onClick={this.onPunchIn}>
                  Punch in
                </div>
              </div>
            </div>

            <div className="menuContainer">
              

              <div className="punchOut">
                {this.state.arrayValueOut.map((item: any, index: any) => {
                  return (
                    <div className="punchOutText">
                      {this.state.value === true ? "punch out ----" : null} {item}
                    </div>
                  );
                })}
              </div>

              <div className="punchIn">
                {this.state.arrayValueIn.map((item: any, index: any) => {
                  return (
                    <div className="punchInText">
                      {this.state.value === true ? "punch in ----" : null} {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
  
      </>
      
    );
  }
}
