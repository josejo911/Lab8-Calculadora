import React from 'react'
import ReactDom from 'react-dom'
import './UI.css'

class Ui extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			display: '0', readyToRefresh: false, op: null, res: null, curr: null, lsBtn: ''
		}
	}

	leadingZeroes(str) {
	    var result;
		if(result = /^-*(0+)\.(0*)/.exec(str)) {
	        return result[1].length + result[2].length;
		} else {
			return 0;
		}
	}

	display(input) {
		var display = this.state.display;

		if (display.length < 9) {
			if (display == 0 && input != '.' && display.length<2)
				display = '';


			display += input == '.' && (display.includes('.') || display.length == 8) ? '' : input;
			this.setState({
				display: display, curr: parseFloat(display), readyToRefresh: true
			});
		}
	}


	resultado() {

		var currentDisplay = [];
		var currentLength = 1;
		var displayStr = '0.';
		var value_prior = 0;
		var value_current = 0;
		var memory = 0;
		var current_op = '';
		var flag_err = false;
		var flag_decimal = false;
		var flag_found_decimal = false;
		var flag_new_op = false;

		if (this.state.display == 'ERROR') return;
		switch(this.state.op) {
			case '+':
				this.state.res += this.state.curr;
				break;
			case '-':
				this.state.res -= this.state.curr;
				break;
			case '*':
				this.state.res *= this.state.curr;
				break;
			case '/':
				this.state.res /= this.state.curr;
				break;
		}

		if (this.state.res > 999999999 || this.state.res < 0) {
			this.setState({
				op: null,
				res: null,
				display: 'ERROR',
				readyToRefresh: false,
				curr: null,
				lsBtn: ''
			})
			return;
		} else {
			var resStr = '' + this.state.res;

			if (resStr.length > 9) {
				this.setState({display: resStr.substring(0, 9)})
			} else {
				this.setState({display: '' + this.state.res})
			}
		}

	}


	operation(input){
		switch (input) {
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case "0":
			case '.':
				if (this.state.display == 'ERROR') break;
				if (/[\*|\/|\-|+]/g.test(this.state.lsBtn)) {
					this.setState({display: '0'}, function() {this.display(input)});
				} else {
					this.display(input);
				}

				this.setState({readyToRefresh: false})

				break;
			case 'C':
				this.setState({
					display: '0', readyToRefresh: false, curr: null, res: null, op: null
				})
				break;
			case '/':
			case '+':
			case '-':
			case '*':
				if (this.state.readyToRefresh && this.state.op != null) {
					this.resultado();
					this.setState({readyToRefresh: false})
				} else {
					this.setState({
						curr: parseFloat(this.state.display), res: parseFloat(this.state.display)
					})
				}
				this.setState({ op: input })
				break;
			case '=':
				if (this.state.op != null) {
					this.resultado();
					this.setState({readyToRefresh: false})
				}
				break;
		}
		this.setState({lsBtn: input})
	}

	render(){
		return (
			<div class = "main" >
				<div class = "calculator">
						<div id="battery">
			                    <div class="line"></div>
			                    <div class="line"></div>
			                    <div class="line"></div>
		                    <div>
	                    </div>
	                </div>
					<div class = "display"> {
						this.state.display} 
						</div>
						<div class = "button-area">
					<button class = "operation "
						onClick = {
							this.operation.bind(this, "/")}> / </button>
					<button class = "operation c_button"
						onClick = {
							this.operation.bind(this, "C")}> C </button>
					<button class = "operation"
						onClick = {
							this.operation.bind(this, "*")}> * </button>
					<button class = "digit"
						onClick = {
							this.operation.bind(this, "7")}> 7 </button>
					<button class = "digit"
						onClick = {
							this.operation.bind(this, "8")}> 8 </button>
					<button class = "digit"
						onClick = {
							this.operation.bind(this, "9")}> 9 </button>
					<button class = "operation"
						onClick = {
							this.operation.bind(this, "-")}> - </button>
					<button class = "digit"
						onClick = {
							this.operation.bind(this, "4")}> 4 </button>
					<button class = "digit"
						onClick = {
							this.operation.bind(this, "5")}> 5 </button>
					<button class = "digit"
						onClick = {
							this.operation.bind(this, "6")}> 6 </button>
					<button class = "operation"
						onClick = {
							this.operation.bind(this, "+")}> + </button>						
					<button class = "digit"
						onClick = {
							this.operation.bind(this, "1")}> 1 </button>
					<button class = "digit"
						onClick = {
							this.operation.bind(this, "2")}> 2 </button>
					<button class = "digit"
						onClick = {
							this.operation.bind(this, "3")}> 3 </button>
					<button class = "operation equal_button"
						onClick = {
							this.operation.bind(this, "=")}> = </button>
					<button class = "digit button_0"
						onClick = {
							this.operation.bind(this, "0")}> 0 </button>
					<button class = "digit"
						onClick = {
							this.operation.bind(this, ".")}> . </button>

					</div>
				</div>
			</div>
		)
	}
}

ReactDom.render( <Ui/>, document.getElementById('root')
)
