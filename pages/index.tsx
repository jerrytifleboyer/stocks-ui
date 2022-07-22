import { useState } from "react";
import { getSession } from "next-auth/react";
import { Navbar } from "../components/Navbar";
import { Tabs } from "../components/Tabs";
import { Watchlist } from "../components/watchlists/Watchlist";
import { Notes } from "../components/notes/Notes";
import { LeftContent } from "../components/LeftContent";

export default function index() {
  const [tab, setTab] = useState<number>(1);

  return (
    <div className="min-h-screen bg-neutral-600 relative">
      <Navbar />
      <div className="flex">
        <LeftContent />
        <div className="w-full rounded bg-indigo-50 py-4 mb-4">
          <Watchlist tab={tab} />
          <Notes tab={tab} />
        </div>
        <Tabs tab={tab} setTab={setTab} />
      </div>
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
