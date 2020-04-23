const keyMapping = [
    {
        name: "clear",
        symbol: "AC"
    }, {
        name: "divide",
        symbol: "/"
    }, {
        name: "multiply",
        symbol: "x"
    }, {
        name: "seven",
        symbol: "7"
    }, {
        name: "eight",
        symbol: "8"
    }, {
        name: "nine",
        symbol: "9"
    }, {
        name: "subtract",
        symbol: "-"
    }, {
        name: "four",
        symbol: "4"
    }, {
        name: "five",
        symbol: "5"
    }, {
        name: "six",
        symbol: "6"
    }, {
        name: "add",
        symbol: "+"
    }, {
        name: "one",
        symbol: "1"
    }, {
        name: "two",
        symbol: "2"
    }, {
        name: "three",
        symbol: "3"
    }, {
        name: "equals",
        symbol: "="
    }, {
        name: "zero",
        symbol: "0"
    }, {
        name: "decimal",
        symbol: "."
    }
];

const NUMBER = "number-key";
const OPERATION = "operation-key";
const EQUALS = "equals-key";
const CLEAR = "clear-key";

class Key extends React.Component {
    constructor(props) {
        super(props);
    }

    //this.props.keySymbol = "0" (<p> content)
    //this.props.keyName = "zero" (ID)

    render() {
        let keyType = null;
        switch(this.props.keySymbol) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case ".":
                keyType = NUMBER;
                break;
            case "+":
            case "-":
            case "x":
            case "/":
                keyType = OPERATION;
                break;
            case "=":
                keyType = EQUALS;
                break;
            case "AC":
                keyType = CLEAR;
                break;
            default:
                console.log("Unrecognised key symbol: " + this.props.keySymbol);
        }
        return (
            <div id={this.props.keyName} 
                onClick={this.props.keyAction(this.props.keySymbol)}
                className={keyType}>
                <p className="key-text">{this.props.keySymbol}</p>
            </div>
        )
    }
}

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let generatedKeyboard = keyMapping.map((keyboardObj, i, keyboardArr) => {
            return (
                <Key
                    keySymbol={keyboardArr[i].symbol}
                    keyName={keyboardArr[i].name}
                    keyAction={this.props.keyAction} />
            )
        });

        return (
            <div id="keyboard">
                {generatedKeyboard}
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
        this.handleKeyBySymbol = this.handleKeyBySymbol.bind(this);
		this.operationPressed = this.operationPressed.bind(this);
        this.numberPressed = this.numberPressed.bind(this);
        this.clearPressed = this.clearPressed.bind(this);
    }
    
    handleKeyBySymbol(symbol) {
        //Call one of the functions below.
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
                <Keyboard keyAction = {this.handleKeyBySymbol} />
            </div>
        )
    }
} 

ReactDOM.render(
  <Calculator />, document.getElementById("main")
);