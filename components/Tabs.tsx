import { TabsInterface } from "../helpers/interfaces/FrontendInterfaces";

export default function Tabs({ tab, setTab }: TabsInterface): JSX.Element {
  return (
    <div className="flex justify-center">
      <button
        className={
          tab === 1
            ? "px-2 py-1 font-bold bg-indigo-50 underline"
            : "px-2 py-1 bg-indigo-200 hover:bg-indigo-100"
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
            ? "px-2 py-1 font-bold bg-indigo-50 underline"
            : "px-2 py-1 bg-indigo-200 hover:bg-indigo-100"
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
