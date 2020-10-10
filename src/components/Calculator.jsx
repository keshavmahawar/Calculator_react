import React from "react";
import "./calculator.css";

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentLine: "0",
			operatorAdd: true,
		};
	}

	addNumber = (no) => {
		let newLine = this.state.currentLine;
		if (this.state.currentLine === "0") {
			newLine = no;
		} else {
			newLine += no.toString();
		}
		this.setState({ currentLine: newLine, operatorAdd: true });
	};

	addOperator = (operator) => {
		let currentString = this.state.currentLine;
		if (this.state.operatorAdd) {
			this.setState({ currentLine: currentString + operator, operatorAdd: false });
		} else {
			this.setState({
				currentLine: currentString.slice(0, -1) + operator,
				operatorAdd: false,
			});
		}
	};

	equal = () => {
		this.setState({ currentLine: this.calculateAns().toString(), operatorAdd: true });
	};

	calculateAns = () => {
		if (this.state.operatorAdd) {
			return eval(this.state.currentLine);
		}

		return eval(this.state.currentLine.slice(0, -1));
	};
	clear = () => {
		this.setState({ currentLine: "0", operatorAdd: true });
	};

	backspace = () => {
		const { currentLine } = this.state;

		let updatedCurrentLine = currentLine.slice(0, -1);
        
        if (!updatedCurrentLine.length) updatedCurrentLine = "0";
        
        if (
			["*", "/", "+", "-"].includes(
				updatedCurrentLine[updatedCurrentLine.length - 1]
			)
		) {
			this.setState({ operatorAdd: false });
		}else{
			this.setState({ operatorAdd: true });
        }
		this.setState({ currentLine: updatedCurrentLine });
    };
    
    getDisplayString = ()=>{
        let displayString = this.state.currentLine.toString()
        displayString = displayString.replace(/\//g,' ÷ ');
        displayString = displayString.replace(/\+/g,' + ');
        displayString = displayString.replace(/-/g,' - ');
        displayString = displayString.replace(/\*/g,' x ');
        return displayString
    }

	render() {
		return (
			<div className="calculator">
				<div className="output">
					{this.getDisplayString()}
					<br />
					{this.calculateAns()}
				</div>
				<div className="keypad">
					<button className="font-lg" onClick={this.clear}>
						C
					</button>
					<button className="font-lg" onClick={this.backspace}>
						CE
					</button>
					<button className="font-lg" onClick={() => this.addNumber(3.141592653)}>
						&pi;
					</button>
					<button
						className="font-lg"
						id="divide"
						onClick={() => this.addOperator("/")}
					>
						&#247;
					</button>
					<button onClick={() => this.addNumber(7)}>7</button>
					<button onClick={() => this.addNumber(8)}>8</button>
					<button onClick={() => this.addNumber(9)}>9</button>
					<button
						className="font-lg"
						id="multiply"
						onClick={() => this.addOperator("*")}
					>
						&#215;
					</button>
					<button onClick={() => this.addNumber(4)}>4</button>
					<button onClick={() => this.addNumber(5)}>5</button>
					<button onClick={() => this.addNumber(6)}>6</button>
					<button
						className="font-lg"
						id="subtract"
						onClick={() => this.addOperator("-")}
					>
						-
					</button>
					<button onClick={() => this.addNumber(1)}>1</button>
					<button onClick={() => this.addNumber(2)}>2</button>
					<button onClick={() => this.addNumber(3)}>3</button>
					<button className="font-lg" id="equal" onClick={this.equal}>
						=
					</button>
					<button className="font-lg" id="zero" onClick={() => this.addNumber(0)}>
						0
					</button>
					<button className="font-lg" id="add" onClick={() => this.addOperator("+")}>
						+
					</button>
				</div>
			</div>
		);
	}
}

export default Calculator;
