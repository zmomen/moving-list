import React from "react";

export default function ErrorBlock({ errors, message }) {
  const isError = message.includes("Error");
  return (
    <div
      style={{
        float: "right",
        color: isError ? "darkred" : "white",
      }}
    >
      {message}
    </div>
  );
}
