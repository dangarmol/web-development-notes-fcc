class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.submitMessage = this.submitMessage.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
      messages: this.state.messages
    });
  }

  submitMessage(event) {
    this.setState({
        input: '',
        messages: [...this.state.messages, this.state.input]
      });
  }
  // add handleChange() and submitMessage() methods here

  render() {
    const items = this.state.messages.map(elem => <li key={elem}>{elem}</li>);
    return (
      <div>
        <h2>Type in a new Message:</h2>
        { /* render an input, button, and ul here */ }
        <input type="text" onChange={this.handleChange.bind(this)} value={this.state.input}></input>
        <button onClick={this.submitMessage}>Send!</button>
        <ul>{items}</ul>
        { /* change code above this line */ }
      </div>
    );
  }
};
