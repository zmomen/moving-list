import React from "react";

export default function ErrorBlock({ errors, message }) {
  let colorStyle;
  switch (true) {
    case message.includes("Error"):
      colorStyle = "darkred";
      break;
    case message.includes("Add"):
      colorStyle = "white";
      break;
    case message.includes("Edit"):
      colorStyle = "black";
      break;
    default:
  }

  return (
    <div
      style={{
        float: "right",
        color: colorStyle,
      }}
    >
      {message}
    </div>
  );
}
