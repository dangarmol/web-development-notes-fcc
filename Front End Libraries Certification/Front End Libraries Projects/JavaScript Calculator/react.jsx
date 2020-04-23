class Key extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let currentKey = {};
        for(let key of notes) {
            if(key.letter === this.props.keyLetter) {
                currentKey = key;
                break;
            }
        }
        return (
            <div id={this.props.clipId} 
                onClick={this.playSound}>
            <p className='clip'></p>
          {this.props.keyTrigger}
      </div>
        )
    }
}

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="keyboard">
                <Key keyLetter="AC" />
                <Key keyLetter="/" />
                <Key keyLetter="x" />
                <Key keyLetter="7" />
                <Key keyLetter="8" />
                <Key keyLetter="9" />
                <Key keyLetter="-" />
                <Key keyLetter="4" />
                <Key keyLetter="5" />
                <Key keyLetter="6" />
                <Key keyLetter="+" />
                <Key keyLetter="1" />
                <Key keyLetter="2" />
                <Key keyLetter="3" />
                <Key keyLetter="=" />
                <Key keyLetter="0" />
                <Key keyLetter="." />
            </div>
        )
    }
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			upperDisplay: "",
			lowerDisplay: "0"
		}
		this.operationPressed = this.operationPressed.bind(this);
        this.numberPressed = this.numberPressed.bind(this);
        this.clearPressed = this.clearPressed.bind(this);
    }
    
	operationPressed(operation) {
        //Keep in mind *- and /-. Keep in mind multiple decimal points.
		this.setState({
			upperDisplay: "",
            lowerDisplay: "0"
		});
	}
	numberPressed(number) {
        //Keep in mind 0000 = 0 at beginning.
		this.setState({
			upperDisplay: "",
            lowerDisplay: "0"
		});
    }
    clearPressed() {
        this.setState({
            upperDisplay: "",
            lowerDisplay: "0"
		});
    }

    render() {
        return (
            <div id="calculator">
                <div id="display">
                    <p id="upper-display">{this.state.upperDisplay}</p>
                    <p id="lower-display">{this.state.lowerDisplay}</p>
                </div>
                <Keyboard />
            </div>
        )
    }
} 

ReactDOM.render(
  <Calculator />, document.getElementById("main")
);