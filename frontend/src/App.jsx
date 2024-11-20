import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png"; // Make sure to import your logo component or image here
import { useEffect } from "react";

export function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={logo} className="mx-auto h-36 w-auto" />
          <div className="flex justify-center">
            <h2 className="text-center text-5xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 font-bold tracking-tight text-gray-900">
              Float
            </h2>
          </div>
        </div>
        <div className="mt-3">
          <p className="flex justify-center text-2xl font-semibold text-gray-500 dark:text-gray-600">
            Your money. Your way.
          </p>
          <p className="flex justify-center text-center text-2xl font-semibold text-gray-500 dark:text-gray-600">
            Whatever you wanna do, “just Float it”
          </p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
              >
                Get Started
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
