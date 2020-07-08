import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  saveInputMessage = (event) => {
    this.setState({
      text: event.currentTarget.value,
    });
  };

  sendMessage = () => {
    const newMessage = { text: this.state.text, role: 'customer' };
    this.props.addInputToMessage(newMessage);
    this.state.text = '';
  };

  render() {
    return (
      <footer className="ChatInput">
        <input type="text" onChange={this.saveInputMessage} value={this.state.text} />
        <button type="button" onClick={this.sendMessage}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
