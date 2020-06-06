import React from "react";

export default function ErrorBlock({ errors, message }) {
  let colorStyle;
  switch (true) {
    case message.includes("Error"):
      colorStyle = "text-error";
      break;
    case message.includes("Add"):
      colorStyle = "text-success";
      break;
    default:
      colorStyle = "black"
  }

  return <div className={`float-right ${colorStyle}`}>{message}</div>;
}
