import React from "react";
import Spinner from "react-bootstrap/Spinner";

function SpinnerLoading() {
  return (
    <div className="App-spinner d-flex align-items-center justify-content-center h-100 my-5">
      <Spinner animation="border" variant="light" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default SpinnerLoading;
