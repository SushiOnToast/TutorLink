import React from 'react';
import "../styles/LoadingIndicator.css"; 
/**
 * LoadingIndicator component to display a loading spinner.
 * 
 * @returns {JSX.Element} The LoadingIndicator component.
 */
function LoadingIndicator() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
}

export default LoadingIndicator;
