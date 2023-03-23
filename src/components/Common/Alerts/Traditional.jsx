import React, { useState, useEffect } from "react";

function Traditional(props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isVisible &&(
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">{props.err}!</strong>
          <span className="block sm:inline">{props.message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3 pl-10">
            <button onClick={() => setIsVisible(false)}>X</button>
          </span>
        </div>
      )}
    </>
  );
}

export default Traditional;
