import { useState } from "react";

export default function Register({ setOptions }): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const registerUser = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(returnToLoginPage, 2000);
    e.target.reset();
  };

  const returnToLoginPage = () => {
    setOptions({ resetPassPage: false, registerPage: false });
    setLoading(false);
  };

  return (
    <form
      onSubmit={registerUser}
      className="h-screen w-screen bg-indigo-300 flex justify-center items-center"
    >
      <div className="w-96 h-2/3 border-2 bg-neutral-100 rounded-xl shadow-xl flex justify-center items-center flex-col space-y-8">
        <div className="text-xl font-bold">Register</div>
        <div className="w-2/3">
          {loading ? (
            <div className="flex justify-center text-green-500">
              Verification code sent to email.
            </div>
          ) : null}
          <input
            type="email"
            required
            placeholder="email@email.com"
            className="w-full p-1 rounded border"
          />
        </div>
        <input
          type="password"
          required
          minLength={8}
          maxLength={255}
          placeholder="password"
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
          className="w-2/3 p-1 rounded border"
        />
        <div className="w-2/3">
          {password1 == password2 && password2.length && !loading ? (
            <div className="flex justify-center text-green-500">Nice.</div>
          ) : password1 != password2 && password2.length && !loading ? (
            <div className="flex justify-center text-red-500">
              passwords are different...
            </div>
          ) : null}
          <input
            type="password"
            required
            minLength={8}
            maxLength={255}
            placeholder="retype password"
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            className="w-full p-1 rounded border"
          />
        </div>
        <button
          type="submit"
          className="py-1 px-2 rounded-lg bg-indigo-300 text-white border hover:bg-indigo-400"
        >
          Register
        </button>
        <button onClick={returnToLoginPage} className="w-full underline">
          return to login
        </button>
      </div>
    </form>
  );
}
