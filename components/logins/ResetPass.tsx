import { useState } from "react";
export default function ResetPass({ setOptions }): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const resetPassword = (e: any) => {
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
      onSubmit={resetPassword}
      className="h-screen w-screen bg-indigo-300 flex justify-center items-center"
    >
      <div className="w-96 h-2/3 border-2 bg-neutral-100 rounded-xl shadow-xl flex justify-center items-center flex-col space-y-8">
        <div className="text-xl font-bold">Reset Password</div>
        <div className="w-2/3">
          {loading ? (
            <div className="flex justify-center text-green-500">
              GO CHECK YOUR EMAIL...
            </div>
          ) : null}
          <input
            type="email"
            required
            placeholder="email@email.com"
            className="w-full p-1 rounded border"
          />
        </div>
        <button
          type="submit"
          className="py-1 px-2 rounded-lg bg-indigo-300 text-white border hover:bg-indigo-400"
        >
          Reset
        </button>
        <button onClick={returnToLoginPage} className="w-full underline">
          return to login
        </button>
      </div>
    </form>
  );
}
