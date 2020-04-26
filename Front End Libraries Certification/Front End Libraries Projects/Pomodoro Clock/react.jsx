// Alarm audio credits:
//"Synth Gliss, B.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org

class ButtonBox extends React.Component {
    constructor(props) {
        super(props);

        this.startStopPressed = this.startStopPressed.bind(this);
        this.resetPressed = this.resetPressed.bind(this);
    }

    startStopPressed(e) {
        this.props.handleStartStop();
    }

    resetPressed(e) {
        this.props.handleReset();
    }

    render() {
        return (
            <div id="button-box">
                <div id="start_stop" onClick={this.startStopPressed}>
                    <i id="play-pause-icon"
                       className={this.props.running ? "fas fa-pause-circle pause-style" : "fas fa-play-circle play-style"}></i>
                </div>
                <div id="reset" onClick={this.resetPressed}>
                    <i className="fas fa-trash-alt reset-style"></i>
                </div>
            </div>
        )
    }
}

class SetupBox extends React.Component {
    constructor(props) {
        super(props);

        this.increasePressed = this.increasePressed.bind(this);
        this.decreasePressed = this.decreasePressed.bind(this);
    }

    increasePressed(e) {
        if(!this.props.running) {
            this.props.changeTime(1);
        }
    }

    decreasePressed(e) {
        if(!this.props.running) {
            this.props.changeTime(-1);
        }
    }

    render() {
        return (
            <div className="control-style" id={this.props.type === "session" ? "session-div" : "break-div"}>
                <label className="label-style" id={this.props.type === "session" ? "session-label" : "break-label"}>{this.props.name}</label>
                <i className="fas fa-arrow-circle-down arrow-down"
                   onClick={this.decreasePressed}
                   id={this.props.type === "session" ? "session-decrement" : "break-decrement"}></i>
                <p className="digital-style" id={this.props.type === "session" ? "session-length" : "break-length"}>{this.props.value}</p>
                <i className="fas fa-arrow-circle-up arrow-up"
                   onClick={this.increasePressed}
                   id={this.props.type === "session" ? "session-increment" : "break-increment"}></i>
            </div>
        )
    }
}

class Countdown extends React.Component {
    constructor(props) {
        super(props);

        this.formatTime = this.formatTime.bind(this);
    }

    formatTime() {
        let time = "";
        time += this.props.currentMin < 10 ? "0" + this.props.currentMin : this.props.currentMin;
        time += ":";
        time += this.props.currentSec < 10 ? "0" + this.props.currentSec : this.props.currentSec;
        return time;
    }

    render() {
        return (
            <div id="countdown-wrapper">
                <label id="timer-label">{this.props.inSession ? "Session" : "Break"}</label>
                <p id="time-left" className="digital-style">{this.formatTime()}</p>
            </div>
        )
    }
}

class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength: 5,
            sessionLength: 25,
            currentMin: 25,
            currentSec: 0,
            running: false,
            inSession: true,
            tickDelay: true
        }
        this.modifyBreak = this.modifyBreak.bind(this);
        this.modifySession = this.modifySession.bind(this);
        this.handleStartStop = this.handleStartStop.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.playBeep = this.playBeep.bind(this);
        this.resetBeep = this.resetBeep.bind(this);
        this.handleClockTick = this.handleClockTick.bind(this);
    }

    componentDidMount() {
        setInterval(this.handleClockTick, 1000);
    }

    modifyBreak(difference) {
        const newValue = (this.state.breakLength + difference > 0 &&
                         this.state.breakLength + difference <= 60) ? 
                         (this.state.breakLength + difference) :
                         (this.state.breakLength);
        this.setState({
            breakLength: newValue
		});
    }

    modifySession(difference) {
        const newValue = (this.state.sessionLength + difference > 0 &&
                         this.state.sessionLength + difference <= 60) ? 
                         (this.state.sessionLength + difference) :
                         (this.state.sessionLength);
        this.setState({
            sessionLength: newValue,
            currentMin: newValue,
            currentSec: 0
        });
    }

    handleClockTick() {
        if(this.state.running) {
            if(this.state.currentMin > 0 || this.state.currentSec > 0) {
                if(this.state.currentSec >= 1) {
                    this.setState({
                        currentSec: this.state.currentSec - 1,
                    });
                } else {
                    this.setState({
                        currentMin: this.state.currentMin - 1,
                        currentSec: 59,
                    });
                }
            } else {
                // Time's up!

                if(this.state.tickDelay) {
                    this.playBeep();
                    this.setState({
                        tickDelay: false
                    });
                } else {
                    if(this.state.inSession) {
                        this.setState({
                            currentMin: this.state.breakLength,
                            currentSec: 0,
                            inSession: false
                        });
                    } else {
                        this.setState({
                            currentMin: this.state.sessionLength,
                            currentSec: 0,
                            inSession: true
                        });
                    }
                    this.setState({
                        tickDelay: true
                    });
                }
            }
        }
    }

    handleStartStop() {
        this.setState({
            running: !this.state.running
		});
    }

    handleReset() {
        this.setState({
            running: false,
            sessionLength: 25,
            breakLength: 5,
            currentMin: 25,
            currentSec: 0,
            inSession: true,
            tickDelay: true
        });
        this.resetBeep();
    }

    playBeep() {
        window.playAlarm();
    }

    resetBeep() {
        window.resetAlarm();
    }

    render() {
        return (
            <div id="container">
                <h1 id="title">Workout Stopwatch!</h1>
                <div id="setup-container">
                    <SetupBox   name="Break Length"
                                type="break"
                                value={this.state.breakLength}
                                changeTime={this.modifyBreak}
                                running={this.state.running} />
                    <SetupBox   name="Session Length"
                                type="session"
                                value={this.state.sessionLength}
                                changeTime={this.modifySession}
                                running={this.state.running} />
                </div>
                <Countdown inSession = {this.state.inSession}
                           currentMin = {this.state.currentMin}
                           currentSec = {this.state.currentSec} />
                <ButtonBox running={this.state.running}
                           handleStartStop={this.handleStartStop}
                           handleReset={this.handleReset} />
                <audio controls hidden id="beep" src="https://freesound.org/data/previews/370/370195_5121236-lq.mp3"></audio>
            </div>
        )
    }
} 

ReactDOM.render(
    <Stopwatch />, document.getElementById("main")
);

function playAlarm() {
    document.getElementById("beep").currentTime = 0;
    $("#beep").trigger("play");
}

function resetAlarm() {
    $("#beep").trigger("pause");
	document.getElementById("beep").currentTime = 0;
}