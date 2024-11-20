import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export function UpdateProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="flex min-h-screen justify-center items-center bg-gray-900">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <div className="flex items-center place-content-between">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Account Settings
            </h5>
            <button
              className="rounded-md hover:bg-gray-900 p-1"
              onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.1}
                stroke="currentColor"
                className="size-6 stroke-white cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div>
            <label
              htmlFor="firstname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Update First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              onChange={(e) => {
                const set = (value) => {
                  setFirstName(value);
                };
                const debouncedSet = debounce(set);
                debouncedSet(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-gray-400 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Jane"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Update Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              onChange={(e) => {
                const set = (value) => {
                  setLastName(value);
                };
                const debouncedSet = debounce(set);
                debouncedSet(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Doe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Update Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                const set = (value) => {
                  setPassword(value);
                };
                const debouncedSet = debounce(set);
                debouncedSet(e.target.value);
              }}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (firstName || lastName || password) {
                axios
                  .put(
                    `${apiUrl}/api/v1/user/`,
                    {
                      firstName: firstName,
                      lastName: lastName,
                      password: password,
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
              }
            }}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
