import { useState, useEffect } from "react";
import Header from "../components/Header";
import { getSession } from "next-auth/react";

export default function suggestions() {
  const [suggestion, setSuggestion] = useState<string>("");

  const closeModal = (e: any) => {
    e.preventDefault();
  };

  const handleSave = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen bg-indigo-300">
      <Header />
      <form
        onSubmit={handleSave}
        className="flex justify-center items-center flex-col mt-10"
      >
        <div className="border w-2/5 h-1/2 bg-indigo-100 rounded-xl">
          <div className="flex justify-center py-4 font-bold">Suggestions</div>
          <div className="flex justify-center items-center flex-col h-1/2">
            <textarea
              className="w-5/6 h-48 resize-none pl-1"
              placeholder="HMU with any tickers you guys want added, or features you want built"
              onChange={(e) => {
                setSuggestion(e.target.value);
              }}
            />
          </div>

          <footer className="flex justify-end p-8">
            <button
              onClick={closeModal}
              className="rounded-xl px-2 py-1 bg-yellow-300 hover:bg-yellow-400 mr-4"
            >
              Close
            </button>
            <button
              type="submit"
              className="rounded-xl px-2 py-1 bg-emerald-300 hover:bg-green-400"
            >
              Save
            </button>
          </footer>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const sessionActive = await getSession({ req: context.req });
  if (!sessionActive) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { sessionActive },
  };
}
