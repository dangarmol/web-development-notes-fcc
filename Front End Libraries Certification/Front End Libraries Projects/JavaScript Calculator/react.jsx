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

    // this.props.keySymbol = "0" (<p> content)
    // this.props.keyName = "zero" (ID)

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
                onClick={this.props.keyAction(this.props.keySymbol, keyType)}
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
        this.performOperation = this.performOperation.bind(this);
        this.handleKeyBySymbol = this.handleKeyBySymbol.bind(this);
        this.operationPressed = this.operationPressed.bind(this);
        this.equalsPressed = this.equalsPressed.bind(this);
        this.numberPressed = this.numberPressed.bind(this);
        this.clearPressed = this.clearPressed.bind(this);
    }
    
    performOperation(operation) {
        // This function takes into account things like /- *- +- and exponentials.
        if(operation.includes("Infinity")) return "Infinity";

        let result = "";
        let operator = operation.replace(/[\d.]/g, "").replace("E+", "").replace("E-", "");
        const number1 = operation.split(operator).length === 2 ?
                        operation.split(operator)[0] :
                        operation.split(operator)[0] + operator + operation.split(operator)[1];
        let number2 = operation.split(operator).length === 2 ?
                        operation.split(operator)[1] :
                        operation.split(operator)[2];
        if(operator.length > 1) {
            number2 = operator[1] + number2;
            operator = operator[0];
        }
        switch(operator) {
            case "+":
                result = (parseFloat(number1) + parseFloat(number2)).toFixed(10);
                break;
            case "-":
                result = (parseFloat(number1) - parseFloat(number2)).toFixed(10);
                break;
            case "x":
                result = (parseFloat(number1) * parseFloat(number2)).toFixed(10);
                break;
            case "/":
                result = (parseFloat(number1) / parseFloat(number2)).toFixed(10);
                break;
        }

        return result;
    }
    handleKeyBySymbol(symbol, type) {
        /*  NUMBER: [0-9.]
            OPERATION: [+-x/]
            EQUALS: "="
            CLEAR "AC"    */
        switch(type) {
            case NUMBER:
                if(symbol === ".") {
                    this.decimalPressed();
                } else {
                    this.numberPressed(symbol);
                }
                break;
            case OPERATION:
                this.operationPressed(symbol);
                break;
            case EQUALS:
                this.equalsPressed();
                break;
            case CLEAR:
                this.clearPressed();
                break;
            default:
                console.log("Unrecognised key symbol: " + this.props.keySymbol);
        }
    }
	operationPressed(operator) {
        let upper = "", lower = "";

        if(["+", "-", "x", "/"].some(symbol => this.state.upperDisplay.includes(symbol))) {
            // If there is already a symbol in the equation...

            if(this.state.upperDisplay.includes("=")) {
                // If an operation was just performed take result and add operator.

                upper = this.state.lowerDisplay + operator;
                lower = operator;
            } else if(["+", "-", "x", "/"].some(symbol => this.state.lowerDisplay === (symbol))) {
                // If last key pressed was an operator.
                
                if(this.state.lowerDisplay !== "-") {
                    // If last operation wasn't a subtraction, negative numbers are allowed.
                    // Otherwise, nothing needs to be done.

                    upper = this.state.upperDisplay + operator;
                    lower = operator;
                }
            } else {
                // If there is already a full operation, execute it and call this method again recursively.

                this.equalsPressed();
                this.operatorPressed(operator);
                return;
            }
        } else {
            // There is no symbol in the equation yet.

            if(this.state.lowerDisplay.endsWith(".")) {
                // If the last character is a decimal point.

                upper = this.state.upperDisplay.slice(0, -1) + operator;
                lower = operator;
            } else {
                // If the last character is a number.

                upper = this.state.upperDisplay + operator;
                lower = operator;
            }
        }

		this.setState({
			upperDisplay: upper,
            lowerDisplay: lower
		});
    }
    equalsPressed() {
        // Keep in mind if last digit is "." or operation.
        let upper = "", lower = "";
        let operationString = "";

        if(this.state.upperDisplay === "") {
            // There is nothing on the displays.

            upper = this.state.upperDisplay;
            lower = this.state.lowerDisplay;
        } else if(["+", "-", "x", "/", "."].some(symbol => this.state.upperDisplay.endsWith(symbol))) {
            // If the last character is a special symbol, remove it on screen and call this function recursively.

            this.setState({
                upperDisplay: this.state.upperDisplay.slice(0, -1),
                lowerDisplay: this.state.lowerDisplay
            });
            
            this.equalsPressed();
            return;

        } else if(this.state.upperDisplay.includes("=")) {
            // If there is an operation performed already.

            const result = this.state.upperDisplay.split("=")[1].trim();
            upper = result + "=" + result;
            lower = result;

        } else {
            // Normal operation.

            operationString = this.state.upperDisplay
            const result = this.performOperation(operationString);

            upper = this.state.upperDisplay + "= " + result;
            lower = result;
        }

        this.setState({
			upperDisplay: upper,
            lowerDisplay: lower
		});
    }
    decimalPressed() {
        // Keep in mind multiple decimal points.
        let upper = "", lower = "";

        //What if there is a full operation?
        if(this.state.upperDisplay.includes("=")) {
            // If there is a full operation already calculated.

            upper = "0.";
            lower = "0.";
        } else if(!this.state.lowerDisplay.includes(".")) {
            // If there are no decimal points yet.

            if(this.state.lowerDisplay === "0") {
                upper = this.state.upperDisplay + "0.";
            } else {
                upper = this.state.upperDisplay + ".";
            }
            lower = this.state.lowerDisplay + ".";
        }

        this.setState({
			upperDisplay: upper,
            lowerDisplay: lower
		});
    }
	numberPressed(number) {
        // Keep in mind 0000 = 0 at beginning.
        let upper = "", lower = "";

        if(["+", "-", "x", "/"].some(symbol => this.state.lowerDisplay === symbol)) {
            // If the lower display is a symbol.
            
            upper = this.state.upper + number;
            lower = number;
        } else if(this.state.lowerDisplay === "0") {
            // If the lower display is zero.

            if(this.state.upperDisplay.endsWith("0")) {
                // If the upper display ends with zero.

                upper = this.state.upperDisplay.slice(0, -1) + number;
                lower = number;
            } else {
                // If the upper display ends in not-zero.

                upper = this.state.upperDisplay + number;
                lower = number;
            }
        } else if (this.state.upperDisplay.includes("=")) {
            // There is a full operation already performed. Just overwrite it.

            upper = number;
            lower = number;
        } else {
            // Normal case.
            
            if(this.state.lowerDisplay.length < 20) {
                // Necessary to avoid overflows.

                upper = this.state.upperDisplay + number;
                lower = this.state.lowerDisplay + number;
            } else {
                upper = this.state.upperDisplay;
                lower = this.state.lowerDisplay;
            }
        }

		this.setState({
			upperDisplay: upper,
            lowerDisplay: lower
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