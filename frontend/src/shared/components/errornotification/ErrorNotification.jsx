import React, { useEffect } from 'react';

function ErrorNotification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div>
      <div className="alert alert-error shadow-lg">
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}

export default ErrorNotification;
