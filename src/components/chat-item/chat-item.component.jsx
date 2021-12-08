import React from "react";
import Avatar from "../avatar/avatar.component";
import userImg from "../../images/user.png"
import jennyImg from "../../images/jenny.png"

function ChatItem({ user, msg}) {
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${user ? user : ""}`}
    >
      <div className="chat__item__content">
        <div className="chat__msg">{msg}</div>
      </div>
      <Avatar image={`${user==="other"?jennyImg:userImg}`} />
    </div>
  );
}

export default ChatItem;
