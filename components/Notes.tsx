import { useState } from "react";
import connectFinnhub from "../backend/connectFinnhub";
import { DataInterface } from "../utils/interfaces/BackendInterfaces";

export default function Notes({ tab, stockData }: any) {
  let foundInNotes = false;
  let foundInDB = false;
  const [noteList, setNoteList] = useState([]);
  const [ticker, setTicker] = useState("");
  const [priceTarget, setPriceTarget] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const addNewNote = () => {
    for (let stock of stockData) {
      //ticker is in the DB
      if (stock.ticker === ticker) {
        const newNote = {
          ticker,
          currPrice: stock.price[stock.price.length - 1],
          priceTarget,
          notes,
        };
        const newNotes = [...noteList, newNote];
        setNoteList(newNotes);
        foundInDB = true;
        break;
      }
    }
    //ticker is not in the DB, quick fetch to the API to get the current price
    if (!foundInDB) {
      const finnhub = connectFinnhub();
      finnhub.quote(
        ticker,
        (err: string, data: DataInterface, response: any) => {
          if (response?.status === 200) {
            const newNote = {
              ticker,
              currPrice: data["c"].toFixed(2) || 0,
              priceTarget,
              notes,
            };
            const newNotes = [...noteList, newNote];
            setNoteList(newNotes);
          }
        }
      );
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (noteList.length) {
      for (let note of noteList) {
        if (note.ticker === ticker) {
          console.log("ticker already in notes list");
          foundInNotes = true;
          break;
        }
      }
      if (!foundInNotes) {
        addNewNote();
      }
    } else {
      addNewNote();
    }
    e.target.reset();
  };

  const removeNote = () => {};

  return (
    <div className={tab === 2 ? "" : "hidden"} onSubmit={handleSubmit}>
      <form>
        {/* input fields to write notes*/}
        <div className="flex justify-center items-center">
          <input
            placeholder="Search for ticker..."
            className="w-64 truncate mx-1 py-1"
            onChange={(e) => {
              setTicker(e.target.value.toUpperCase());
            }}
            name="ticker"
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
      {/* header */}
      {noteList.length ? (
        <div className="grid grid-cols-10">
          <div className="font-bold mx-1 col-start-1 truncate">Ticker</div>
          <div className="font-bold mx-1 col-start-2 truncate">
            Current Price
          </div>
          <div className="font-bold col-start-3 truncate">Price Target</div>
          <div className="font-bold col-start-4 mx-1 truncate">Notes</div>
        </div>
      ) : null}
      {/* actual notes list */}
      {noteList.map((e) => (
        <div className="flex" key={e.ticker}>
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
