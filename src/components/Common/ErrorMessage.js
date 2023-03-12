import React, { useState } from 'react';

function ErrorMessage({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleTimeout = () => {
    setIsVisible(false);
  };

  setTimeout(handleTimeout, 2000);

  return (
    <>
      {isVisible && (
        <span className="text-red-500 px-2 py-1 rounded">{message}</span>
      )}
    </>
  );
}

export default ErrorMessage;
