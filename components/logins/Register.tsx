import { useState } from "react";

export default function Register({ setOptions }: any): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const registerUser = (e: any) => {
    e.preventDefault();
    if (password === password2 && password.trim().length >= 8) {
      createUser();
    }
    setEmail("");
    setPassword("");
    setPassword2("");
    e.target.reset();
  };

  const returnToLoginPage = () => {
    setOptions({ resetPassPage: false, registerPage: false });
    setLoading(false);
  };

  const createUser = async () => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      setWarning("i cannot register you");
    } else {
      setLoading(true);
      setTimeout(returnToLoginPage, 1000);
    }
  };

  return (
    <div className="h-screen w-screen bg-indigo-300 flex justify-center items-center">
      {loading ? (
        <div className="flex justify-center items-center w-96 h-40 border-2 bg-neutral-100 rounded-xl shadow-xl flex-col">
          <div className="text-xl font-bold">
            Redirecting back to the login...
          </div>
        </div>
      ) : (
        <form
          onSubmit={registerUser}
          className="h-screen w-screen flex justify-center items-center"
        >
          <div className="w-96 h-2/3 border-2 bg-neutral-100 rounded-xl shadow-xl flex justify-center items-center flex-col space-y-8">
            <div className="text-xl font-bold">Register</div>

            <div className="w-2/3">
              {warning && (
                <div className="flex justify-center text-center text-red-500 ">
                  {warning}
                </div>
              )}

              <input
                type="email"
                required
                placeholder="email@email.com"
                minLength={5}
                maxLength={40}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setWarning("");
                }}
                className="w-full p-1 rounded border"
              />
            </div>

            <input
              type="password"
              required
              minLength={8}
              maxLength={40}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-2/3 p-1 rounded border"
            />

            <div className="w-2/3">
              {password == password2 && password2.length && !loading ? (
                <div className="flex justify-center text-green-500">Nice.</div>
              ) : password != password2 && password2.length && !loading ? (
                <div className="flex justify-center text-red-500">
                  passwords do not match...
                </div>
              ) : null}
              <input
                type="password"
                required
                minLength={8}
                maxLength={40}
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

            <button
              type="button"
              onClick={returnToLoginPage}
              className="w-full underline"
            >
              return to login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
