import React from "react";

export default function ErrorBlock({ errors, message }) {
  return (
    <div style={{ float: "right", color: "darkred" }}>
      Error! {message}
    </div>
  );
}
