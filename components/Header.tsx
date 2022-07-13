import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Header(): JSX.Element {
  const logout = () => {
    signOut();
  };

  return (
    <>
      <ul className="grid grid-cols-7 font-bold text-xl p-2">
        <li className="col-start-4 flex justify-center text-center">
          <Link href="/">Trade Secrets</Link>
        </li>
        <li className="col-start-6 flex justify-end items-center hover:underline">
          <Link href="/suggestions">Suggestions</Link>
        </li>
        <button
          onClick={logout}
          className="col-start-7 flex justify-center items-center font-bold hover:underline"
        >
          Log Out
        </button>
      </ul>
      <hr className="mb-2" />
    </>
  );
}
