import React, { Component, createRef } from "react";
import "./chat-content.styles.css";

import ChatItem from "../chat-item/chat-item.component";
import ChatContentFooter from "../chat-content-footer/chat-content-footer.component";

import { Interactions } from "aws-amplify";

export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  chatItms = [
    {
      key: 1,
      type: "other",
      msg: "Hello, I am Jenny ",
    },
    {
      key: 2,
      type: "other",
      msg: "How can I help you?",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  sendMsg = (msg,type="") => {
    this.chatItms.push({
      key: this.chatItms.length + 1,
      type: type,
      msg: msg?msg:this.state.msg,
    });
    this.setState({ chat: [...this.chatItms] });
    this.scrollToBottom();
    this.setState({ msg: "" });
  };

  handleSendMsg = async () => {
    const BOT_NAME = "studentChatbot_dev"
    if (this.state.msg !== "") {
      const msg = this.state.msg;
      this.sendMsg();
      console.log(msg);
      const result = await Interactions.send(BOT_NAME, msg);
      console.log(result);
      this.sendMsg(result.message,"other")
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        this.handleSendMsg();
      }
    });
    this.scrollToBottom();
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__body">
          <div className="chat__items">
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <ChatContentFooter
          onStateChange={this.onStateChange}
          handleSendMsg={this.handleSendMsg}
          msg={this.state.msg}
        />
      </div>
    );
  }
}
