import React, { useEffect, useState } from "react";

function Danger(props) {
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
    {isVisible &&(
      <div role="alert" className="fixed right-5 top-5 z-50">
        <div className=" bg-red-500 text-white font-bold rounded-t px-4 py-2">
          Danger
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>{props.err}.</p>
        </div>
      </div>
    )}
    </>
  );
}

export default Danger;
