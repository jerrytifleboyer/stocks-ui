import { useState } from "react";
import ResetPass from "../components/logins/ResetPass";
import Register from "../components/logins/Register";
import { LoginPagesInterface } from "../helpers/interfaces/FrontendInterfaces";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [options, setOptions] = useState<LoginPagesInterface>({
    resetPassPage: false,
    registerPage: false,
  });

  const switchToResetPassPage = () => {
    setOptions({ resetPassPage: true, registerPage: false });
  };

  const switchToRegisterPage = () => {
    setOptions({ resetPassPage: false, registerPage: true });
  };

  const login = async (e: any) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setWarning("something went wrong");
    } else {
      router.replace("/");
    }
    e.target.reset();
  };

  return (
    <div>
      {options.registerPage ? (
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
              onChange={(e) => {
                setEmail(e.target.value);
                setWarning("");
              }}
              className="w-2/3 p-1 rounded border"
            />
            <input
              type="password"
              required
              minLength={8}
              maxLength={40}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setWarning("");
              }}
              className="w-2/3 p-1 rounded border"
            />
            <button
              type="submit"
              className="py-1 px-2 rounded-lg bg-indigo-300 text-white border hover:bg-indigo-400"
            >
              Login
            </button>
            <div className="flex">
              {/* <button
                type="button"
                className="w-full underline"
                onClick={switchToResetPassPage}
              >
                reset password
              </button> */}
              <button
                type="button"
                className="w-full underline"
                onClick={switchToRegisterPage}
              >
                register
              </button>
            </div>
            <div className="text-red-500">{warning}</div>
          </div>
        </form>
      )}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const sessionActive = await getSession({ req: context.req });
  if (sessionActive) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { sessionActive },
  };
}
