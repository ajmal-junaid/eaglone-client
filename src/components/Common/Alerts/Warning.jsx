import React, { useEffect, useState } from "react";

function Warning(props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      {isVisible && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
          role="alert"
        >
          <p className="font-bold">Be Warned</p>
          <p>{props.err}.</p>
        </div>
      )}
    </>
  );
}

export default Warning;
