import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound({ errorMessage }) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-red-700">
      <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-4">{errorMessage}</p>
      <button
        onClick={handleGoBack}
        className="px-4 py-2 bg-red-700 text-white rounded"
      >
        Go Back
      </button>
    </div>
  );
}

export default NotFound;