import React from "react";


const BaseSpinner: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center position-fixed top-50 start-50 opacity-75 z-2">
      <div
        className={`spinner-border text-success`}
        style={{ width: "4rem", height: "4rem", borderWidth: "7px" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default BaseSpinner;
