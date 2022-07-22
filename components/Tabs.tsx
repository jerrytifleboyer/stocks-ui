import { TabsInterface } from "../helpers/interfaces/FrontendInterfaces";

export function Tabs({ tab, setTab }: TabsInterface): JSX.Element {
  return (
    <div className="w-64 flex flex-col mr-4">
      <button
        className={
          tab === 1
            ? "px-2 py-2 bg-indigo-400 text-white rounded-t font-bold underline"
            : "px-2 py-2 bg-indigo-400 text-white rounded-t hover:bg-indigo-500 hover:underline"
        }
        onClick={() => {
          setTab(1);
        }}
      >
        Watchlist
      </button>
      <button
        className={
          tab === 2
            ? "px-2 py-2 bg-blue-400 text-white font-bold underline"
            : "px-2 py-2 bg-blue-400 text-white hover:bg-blue-500 hover:underline"
        }
        onClick={() => {
          setTab(2);
        }}
      >
        Notes
      </button>
    </div>
  );
}
