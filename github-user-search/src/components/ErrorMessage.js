import React from "react";

function ErrorMessage({ message }) {
  return <div className="text-danger my-5 text-center">{message}</div>;
}

export default ErrorMessage;