import React from "react";
import "./SubmitButton.css"

const SubmitButton = ({isLoading, title, disabled}) => {
  return (
    <button type="submit" id="submitButton" disabled={isLoading}>
      {isLoading && (
        <img
          src={process.env.PUBLIC_URL + "/svg/refresh.svg"}
          alt="refresh-spinning"
          id="submitButtonRefreshIcon"
        />
      )}
      <span>{title}</span>
    </button>
  );
};

export default SubmitButton;
