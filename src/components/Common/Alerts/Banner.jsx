import React, { useEffect, useState } from "react";

function Banner(props) {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      props.setErr(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="fixed right-5 top-0 z-50 w-80 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p className="font-bold">{props.err}</p>
          <p className="text-sm">
            Some additional text to explain said message.
          </p>
        </div>
      )}
    </>
  );
}

export default Banner;
