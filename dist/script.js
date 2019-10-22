const MAX_DIGIT = 12;
class CalculatorApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSave: "",
      input: "0",
      prevInput: "",
      limit: false };

    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(event) {
    if (this.state.limit && event.target.textContent != "AC" &&
    event.target.textContent != "=" && !operator.includes(event.target.textContent)) {
      const inputNumb = this.state.input;
      this.setState({
        input: "LIMITED!" });

      setTimeout(() =>
      this.setState({
        input: inputNumb }),
      1000);
      return;
    }
    if (this.state.prevInput == "=") {
      if (operator.includes(event.target.textContent)) {
        this.setState({
          inputSave: this.state.input + event.target.textContent,
          input: event.target.textContent,
          prevInput: this.state.input });

        return;
      } else if (event.target.textContent == ".") {
        this.setState({
          inputSave: "0" + event.target.textContent,
          input: "0" + event.target.textContent,
          prevInput: "0" });

        return;
      } else if (event.target.textContent == "=") {
        return;
      } else if (event.target.textContent == "AC") {
        this.setState({
          input: "0",
          inputSave: "",
          prevInput: "" });

        return;
      } else {
        this.setState({
          inputSave: event.target.textContent,
          input: event.target.textContent,
          prevInput: this.state.input });

        return;
      }
    } else switch (event.target.textContent) {
      case "=":
        const save = operator.includes(this.state.input) ? this.state.inputSave.slice(0, -1) :
        this.state.inputSave != "" ? this.state.inputSave : "0";
        let result = math.evaluate(save);
        if (!math.isInteger(result)) {
          const temp = math.round(result);
          result = math.format(result, MAX_DIGIT - temp.toString().length + 1);
        }
        this.setState({
          input: result,
          inputSave: save + event.target.textContent + result,
          prevInput: "=",
          limit: false });

        break;
      case "AC":
        this.setState({
          input: "0",
          inputSave: "",
          prevInput: "",
          limit: false });

        break;
      case ".":
        if (this.state.input == "0" || operator.includes(this.state.input)) {
          this.setState({
            input: "0" + event.target.textContent,
            inputSave: this.state.inputSave + "0" + event.target.textContent,
            prevInput: this.state.input });

          break;
        } else
        if (this.state.input.includes(".")) break;else
        if (!operator.includes(this.state.input)) {
          this.setState({
            input: this.state.input + event.target.textContent,
            inputSave: this.state.inputSave + event.target.textContent,
            prevInput: this.state.input });

          break;
        }
      case "+":
      case "-":
      case "*":
      case "/":
        if (operator.includes(this.state.input)) {
          if (this.state.input != event.target.textContent) {
            this.setState({
              input: event.target.textContent,
              inputSave: this.state.inputSave.slice(0, -1) + event.target.textContent,
              prevInput: this.state.input,
              limit: false });

            break;
          } else break;
        } else
        if (this.state.input == "0") {
          this.setState({
            input: event.target.textContent,
            inputSave: "0" + event.target.textContent,
            prevInput: this.state.input,
            limit: false });

          break;
        } else {
          this.setState({
            input: event.target.textContent,
            inputSave: this.state.inputSave + event.target.textContent,
            prevInput: this.state.input,
            limit: false });

          break;
        }
      default:
        this.setState({
          input: this.state.input == "0" || operator.includes(this.state.input) ?
          event.target.textContent : this.state.input + event.target.textContent,
          inputSave: this.state.inputSave + event.target.textContent,
          prevInput: this.state.input,
          limit: this.state.input.length >= MAX_DIGIT - 1 ? true : false });}

    ;
  }

  render() {
    const buttons = arrayButtons.map(value => React.createElement(Button, { key: value.name, name: value.name, data: value.symbol, click: this.handleInput }));
    return (
      React.createElement("div", { className: "calculator" },
      React.createElement("div", { className: "screen" },
      React.createElement(Screen, { name: "formulaScreen", data: this.state.inputSave }),
      React.createElement(Screen, { name: "outputScreen", id: "display", data: this.state.input })),

      React.createElement("div", { className: "container" }, buttons)));


  }}


const Screen = props => {
  return React.createElement("div", { className: props.name, id: props.id }, props.data);
};

const arrayButtons = [{ "name": "zero", "symbol": "0" }, { "name": "one", "symbol": "1" }, { "name": "two", "symbol": "2" },
{ "name": "three", "symbol": "3" }, { "name": "four", "symbol": "4" }, { "name": "five", "symbol": "5" },
{ "name": "six", "symbol": "6" }, { "name": "seven", "symbol": "7" }, { "name": "eight", "symbol": "8" },
{ "name": "nine", "symbol": "9" }, { "name": "add", "symbol": "+" }, { "name": "subtract", "symbol": "-" },
{ "name": "multiply", "symbol": "*" }, { "name": "divide", "symbol": "/" }, { "name": "decimal", "symbol": "." },
{ "name": "clear", "symbol": "AC" }, { "name": "equals", "symbol": "=" }];

const operator = ["+", "-", "*", "/"];

const Button = props => {
  return React.createElement("div", { className: "button", id: props.name, onClick: props.click }, props.data);
};




ReactDOM.render(React.createElement(CalculatorApp, null), document.getElementById('root'));