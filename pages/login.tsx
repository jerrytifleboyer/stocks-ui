import React, { useState } from "react";
import ResetPass from "../components/logins/ResetPass";
import Register from "../components/logins/Register";

export default function login() {
  const [options, setOptions] = useState({
    resetPassPage: false,
    registerPage: false,
  });

  const switchToResetPassPage = () => {
    setOptions({ resetPassPage: true, registerPage: false });
  };

  const switchToRegisterPage = () => {
    setOptions({ resetPassPage: false, registerPage: true });
  };

  const login = (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      {options.resetPassPage ? (
        <ResetPass setOptions={setOptions} />
      ) : options.registerPage ? (
        <Register setOptions={setOptions} />
      ) : (
        <form
          className="h-screen w-screen bg-indigo-300 flex justify-center items-center"
          onSubmit={login}
        >
          <div className="w-96 h-2/3 border-2 bg-neutral-100 rounded-xl shadow-xl flex justify-center items-center flex-col space-y-8">
            <div className="text-xl font-bold">Login</div>
            <input
              type="email"
              required
              placeholder="email@email.com"
              className="w-2/3 p-1 rounded border"
            />
            <input
              type="password"
              required
              minLength={8}
              maxLength={255}
              placeholder="password"
              className="w-2/3 p-1 rounded border"
            />
            <button
              type="submit"
              className="py-1 px-2 rounded-lg bg-indigo-300 text-white border hover:bg-indigo-400"
            >
              Login
            </button>
            <div className="flex">
              <button
                className="w-full underline"
                onClick={switchToResetPassPage}
              >
                reset password
              </button>
              <button
                className="w-full underline"
                onClick={switchToRegisterPage}
              >
                register
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
