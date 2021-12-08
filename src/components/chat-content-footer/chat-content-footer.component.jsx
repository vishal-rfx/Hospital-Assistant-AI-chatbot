import React from "react";
import "./chat-content-footer.styles.css"

function ChatContentFooter({onStateChange,handleSendMsg,msg}) {
  return (
    <div className="content__footer">
      <div className="sendNewMessage">
        <input
          type="text"
          placeholder="Type a message here"
          onChange={onStateChange}
          value={msg}
        />
        <button className="btnSendMsg" id="sendMsgBtn" onClick={handleSendMsg}>
          <i className="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

export default ChatContentFooter;
