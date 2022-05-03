import { useState } from "react";

export default function Notes({ tab, stockData }: any) {
  const [arr, setArr] = useState([]);
  const [ticker, setTicker] = useState("");
  const [priceTarget, setPriceTarget] = useState("");
  const [notes, setNotes] = useState("");

  const pullFromDB = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/notes");
    const data = await response.json();

    [...arr].forEach((e) => {
      console.log("here");
      if (e.ticker === ticker) {
        console.log("already in list");
      } else {
        for (let ii of data) {
          if (ticker == ii.ticker) {
            const newNote = {
              id: ii._id,
              ticker: ticker,
              currPrice: ii.price[ii.price.length - 1],
              priceTarget,
              notes,
            };
            const newNotes = [...arr, newNote];
            setArr(newNotes);
          }
        }
      }
    });

    e.target.reset();
  };
  const removeNote = () => {};

  return (
    <div className={tab === 2 ? "" : "hidden"} onSubmit={pullFromDB}>
      <form>
        {/* input fields to write notes*/}
        <div className="flex justify-center items-center ">
          <input
            placeholder="Search for ticker..."
            className="w-64 border-2 truncate mx-1 col-start-1"
            onChange={(e) => {
              setTicker(e.target.value.toUpperCase());
            }}
          />
          <button
            type="submit"
            className="rounded bg-indigo-400 text-white px-2 py-1 mx-1 truncate hover:bg-indigo-500"
          >
            Add
          </button>
        </div>
      </form>
      {/* dynamically generated notes */}
      {arr.length ? (
        <div className="grid grid-cols-10">
          <div className="font-bold mx-1 col-start-1 truncate">Ticker</div>
          <div className="font-bold mx-1 col-start-2 truncate">
            Current Price
          </div>
          <div className="font-bold col-start-3 truncate">Price Target</div>
          <div className="font-bold col-start-4 mx-1 truncate">Notes</div>
        </div>
      ) : null}
      {arr.map((e) => (
        <div className="flex" key={e.id}>
          <div className="border-2">{e.ticker}</div>
          <div className="border-2">{e.currPrice}</div>
          <input className="border-2 mx-1" />
          <input className="border-2 flex-grow" />
          <button onClick={removeNote} className="border-2">
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}
