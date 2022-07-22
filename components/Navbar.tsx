import Link from "next/link";
import { signOut } from "next-auth/react";

export function Navbar(): JSX.Element {
  const logout = () => {
    signOut();
  };

  return (
    <>
      <ul className="grid grid-cols-7 font-bold text-xl p-2">
        <li className="col-start-4 flex justify-center text-center text-white">
          <Link href="/">Trade Secrets</Link>
        </li>
        <li className="col-start-6 flex justify-end items-center text-white hover:underline">
          <Link href="/suggestions">Suggestions</Link>
        </li>
        <button
          onClick={logout}
          className="col-start-7 flex justify-center items-center font-bold text-white hover:underline"
        >
          Log Out
        </button>
      </ul>
      <hr className="mb-4" />
    </>
  );
}
