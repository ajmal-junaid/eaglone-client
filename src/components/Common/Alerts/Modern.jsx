import React, { useEffect, useState } from "react";

function Modern(props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      props.setErr(!isVisible);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      {isVisible && (
        <div className="fixed right-5 top-5 z-50 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
          <div className="flex items-center justify-center">
            <svg
              className="fill-current w-6 h-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm4.293 7.707l-4.6 4.6-2.293-2.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414z" />
            </svg>
            <p className="text-sm font-semibold">Success! {props.err}.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Modern;
