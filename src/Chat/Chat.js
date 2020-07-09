import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    console.log(answersData.flatMap((answer) => answer.tags));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  setMessage(newMessage) {
    this.setState((prevState) => ({
      messages: [...prevState.messages, newMessage],
    }));
  }

  getAutoResponse = async (text) => {
    const tags = answersData.flatMap((answer) => answer.tags);
    tags.forEach((tag) => {
      if (text.includes(tag)) {
        const answerMessage = answersData.find((answer) => answer.tags.includes(tag));
        this.setMessage(answerMessage);
      }
    });
  };

  addMessage = (newMessage) => {
    this.setMessage(newMessage);
    this.getAutoResponse(newMessage.text);
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput addInputToMessage={this.addMessage} />
      </main>
    );
  }
}

export default Chat;
