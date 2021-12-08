import React from "react";
import "./avatar.styles.css"

function Avatar({ image }) {
  return (
    <div className="avatar">
      <div className="avatar-img">
        <img src={image} alt="#" />
      </div>
    </div>
  );
}

export default Avatar;
