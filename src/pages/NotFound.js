import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <div className="text-gray-600 text-6xl font-bold mb-8">
        Oops, Page Not Found!
      </div>
      <div className="text-gray-500 text-lg mb-8">
        It looks like you&apos;re lost. Here are some helpful links instead:
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/" className="btn btn-blue cursor-pointer">
          Home
        </Link>
        <Link to="/contact" className="btn btn-green">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default NotFound;