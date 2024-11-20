import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Send() {
  const [amount, setAmount] = useState("");
  const { state } = useLocation();
  const { firstName, userId } = state;

  const navigate = useNavigate();

  const debounce = (mainFunction, delay = 250) => {
    let timer;

    return function (...args) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    };
  };

  return (
    <div
      id="send-modal"
      tabIndex="-1"
      aria-hidden="false"
      className="flex flex-1 overflow-y-auto bg-gray-900 overflow-x-hidden fixed justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-screen max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-2xl dark:bg-gray-700">
          <div className="flex text-center items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl ml-auto pl-4 font-semibold text-gray-900 dark:text-white">
              Send Money
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" action="#">
              <div>
                <div className="flex justify-center">
                  <div className="font-semibold text-gray-700 rounded-full bg-white flex items-center justify-center font-mono h-10 w-10 text-2xl">
                    {/*eslint-disable-next-line react/prop-types*/}
                    {firstName && firstName.charAt(0)}
                  </div>
                  <h2 className="text-2xl my-auto pl-4 text-white font-semibold">
                    {/*eslint-disable-next-line react/prop-types*/}
                    {firstName}
                  </h2>
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Amount
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    onChange={(e) => {
                      const set = (value) => {
                        setAmount(value);
                      };
                      const debouncedSet = debounce(set);
                      debouncedSet(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="0"
                    required
                  />
                </div>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    axios
                      .post(
                        "http://localhost:3000/api/v1/account/transfer",
                        {
                          to: userId,
                          amount: Number(amount),
                        },
                        {
                          headers: {
                            authorization:
                              "Bearer " + localStorage.getItem("token"),
                          },
                        },
                      )
                      .then((response) => {
                        if (response.status == "200") {
                          navigate("/dashboard");
                        }
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  }}
                  className="w-full text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Initiate Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
