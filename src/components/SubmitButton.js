import React from "react";
import "./SubmitButton.css"

const SubmitButton = ({isLoading, title, className}) => {
  return (
    <button type="submit" className={`submitButton ${className}`} disabled={isLoading}>
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
