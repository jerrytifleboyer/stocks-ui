import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function Notes({ tab }: any): JSX.Element {
  let foundInNotes = false;
  const [noteList, setNoteList] = useState<object[]>([]);
  const [fetchData, setFetchData] = useState<object[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editNote, setEditNote] = useState<object>({});
  const [ticker, setTicker] = useState<string>("");
  const [loading, setLoading] = useState(true);

  //load notes from db
  useEffect(() => {
    const loadSavedNotes = async () => {
      try {
        const response = await fetch("api/notes");
        const data = await response.json();
        setNoteList(data);
      } catch {
        console.log("could not load notes");
      }
    };
    loadSavedNotes();
  }, []);

  //get stock data, used to compare what tickers im collecting data for
  useEffect(() => {
    const getStockData = async () => {
      try {
        const response = await fetch("api/watchlist");
        const data = await response.json();
        setFetchData(data);
      } catch {
        console.log("could not get stock data for my notes");
      }
    };
    getStockData();
  }, []);

  const addToNotelist = () => {
    for (let stock of fetchData) {
      if (stock.ticker === ticker) {
        const newNotes = [stock, ...noteList];
        setNoteList(newNotes);
      }
    }
    //TODO, handle addnote if it's not found in DB, find on Finnhub instead
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //TODO set a warning in the front end instead of a CL
    //checking if it's in your notes already
    if (noteList.length) {
      for (let note of noteList) {
        if (note.ticker === ticker) {
          console.log("ticker already in notes list");
          foundInNotes = true;
          break;
        }
      }
      //if not add it
      if (!foundInNotes) {
        addToNotelist();
      }
    }
    //there are no notes
    else {
      addToNotelist();
    }
    e.target.reset();
  };

  const removeNote = (index: number) => {
    noteList.splice(index, 1);
    setNoteList([...noteList]);
  };

  const editButton = () => {
    setModalOpen(true);
  };

  return (
    <div className={tab === 2 ? "" : "hidden"}>
      {/* ticker search bar */}
      <form className="mb-2" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <input
            placeholder="Search for ticker..."
            className="w-64 truncate mx-1 p-1"
            onChange={(e) => {
              setTicker(e.target.value.toUpperCase().trim());
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
      {/* header */}
      {noteList.length && (
        <div className="flex">
          <div className="font-bold w-20 flex justify-center truncate">
            Ticker
          </div>
          <div className="font-bold w-24 truncate">Current Price</div>
          <div className="font-bold w-24 truncate">Price Target</div>
          <div className="font-bold flex-grow flex justify-center truncate">
            Notes
          </div>
          <div className="px-4"></div>
        </div>
      )}

      {/* the actual notes list */}
      {noteList.map((e: any, index) => (
        <div className="flex" key={index}>
          <div className="border w-20 flex justify-center items-center">
            {e.ticker}
          </div>
          <div className="border w-24 flex justify-center items-center">
            ${e.price[e.price.length - 1]}
          </div>
          <div className="border w-24 flex justify-center items-center">
            {e.priceTarget ? (
              <div>${e.priceTarget}</div>
            ) : (
              <button
                onClick={() => {
                  editButton();
                  setEditNote(e);
                }}
                className="text-blue-400 underline"
              >
                Edit
              </button>
            )}
          </div>
          <div className="border flex-grow flex justify-center items-center">
            {e.notes ? (
              e.notes
            ) : (
              <button
                onClick={() => {
                  editButton();
                  setEditNote(e);
                }}
                className="text-blue-400 underline"
              >
                Edit
              </button>
            )}
          </div>
          <button onClick={() => removeNote(index)} className="px-2">
            <img src="/images/editButton.svg" className="m-1" />
          </button>
        </div>
      ))}

      {/* your modal for editing the notes */}
      {modalOpen && (
        <Modal
          editNote={editNote}
          setEditNote={setEditNote}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
}
