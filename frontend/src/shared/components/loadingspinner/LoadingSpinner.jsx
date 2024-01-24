import React from 'react';

import './LoadingSpinner.css';

function LoadingSpinner(props) {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring" data-testid="loading-spinner" />
    </div>
  );
}

export default LoadingSpinner;
