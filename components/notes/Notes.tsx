import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { SearchBar } from "../SearchBar";
import {
  NotesListInterface,
  TickerDataInterface,
} from "../../helpers/interfaces/FrontendInterfaces";

export function Notes({
  tab,
  checklist,
}: {
  tab: number;
  checklist: TickerDataInterface[];
}): JSX.Element {
  let foundInNotes = false;
  const [notesList, setNotesList] = useState<NotesListInterface[]>([]); //controls the users note
  const [modalOpen, setModalOpen] = useState<boolean>(false); //opening/closing modal
  const [ticker, setTicker] = useState<string>(""); //user search value, used in the search bar
  const [warning, setWarning] = useState<string>(""); //warn user
  const [editNote, setEditNote] = useState<object>({}); //holds the note object currently being editted

  //gets all of the users notes
  useEffect(() => {
    const loadSavedNotes = async () => {
      try {
        const response = await fetch("api/notes");
        const { success, notes } = await response.json();
        if (success) {
          setNotesList(notes);
        }
      } catch (err) {
        setWarning("something went wrong, could not load notes...");
      }
    };
    loadSavedNotes();
  }, []);

  //if i have the data on hand, fill out the ticker, name, currentPrice, and date
  const addNoteToList = () => {
    for (let stock of checklist) {
      if (ticker === stock.ticker) {
        const newNote: any = [
          {
            ticker: stock.ticker,
            name: stock.name,
            date: new Date().toDateString(),
            price: stock.currentPrice,
          },
          ...notesList,
        ];
        setNotesList(newNote);
        return;
      }
    }
    setWarning("we don't carry that stock, maybe you can suggest it");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //stops you if you already have a note
    if (notesList.length) {
      for (let note of notesList) {
        if (ticker === note["ticker"]) {
          setWarning(`${ticker} is already in your list`);
          foundInNotes = true;
          break;
        }
      }
      //it's not in your notes, add it
      if (!foundInNotes) {
        addNoteToList();
      }
    }
    //adding your first note
    else {
      addNoteToList();
    }
    e.target.reset();
  };

  const handleEditNote = (e: any) => {
    e.preventDefault();
  };

  const edit = (e: any, note: NotesListInterface) => {
    e.preventDefault();
    setEditNote(note);
    setModalOpen(true);
  };
  // const removeNote = (index: number) => {
  //   noteList.splice(index, 1);
  //   setNoteList([...noteList]);
  // };

  // const editButton = () => {
  //   setModalOpen(true);
  // };
  // console.log("noteslist", notesList);
  // console.log("editnote", editNote);

  return (
    <div className={tab === 2 ? "" : "hidden"}>
      <div className="flex justify-center text-red-500">{warning}</div>
      <SearchBar
        handleSubmit={handleSubmit}
        setTicker={setTicker}
        setWarning={setWarning}
        contentLoaded={notesList}
      />

      {notesList.length ? (
        <div className="flex">
          <div className="flex items-center font-bold mx-2 w-28">Ticker</div>
          <div className="flex items-center font-bold w-20 mx-2">
            Current Price
          </div>
          <div className="flex items-center font-bold w-20 mx-2">
            Price Target
          </div>
          <div className="flex items-center font-bold w-28 mx-2">
            Date Added
          </div>
          <div className="flex items-center font-bold justify-center flex-grow">
            Notes
          </div>
          <div className="px-6" />
        </div>
      ) : (
        <div className="flex justify-center items-center text-lg">
          It seems that you have no notes
        </div>
      )}

      {/* for some reason it returns 0 if i use && */}
      {notesList.length
        ? notesList.map((note: NotesListInterface) => (
            <div
              key={note.ticker.toString()}
              className="flex odd:bg-indigo-100"
            >
              <div
                className={
                  note.name ? "mx-2 w-28" : "flex items-center mx-2 w-28"
                }
              >
                <div className="text-lg">{note.ticker}</div>
                <div className="text-sm truncate">{note.name}</div>
              </div>
              <div className="flex items-center w-20 mx-2 text-xl">
                {note.price && <div>${note.price}</div>}
              </div>

              <div className="flex items-center w-20 mx-2 text-xl">
                {note.priceTarget ? (
                  <div>${note.priceTarget}</div>
                ) : (
                  <button
                    onClick={(e) => {
                      edit(e, note);
                    }}
                    className="text-blue-400 underline"
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="flex items-center w-28 mx-2">{note.date}</div>
              <div className="flex items-center justify-center flex-grow text-lg mx-2">
                {note.notes ? (
                  <div>{note.notes}</div>
                ) : (
                  <button
                    onClick={(e) => {
                      edit(e, note);
                    }}
                    className="text-blue-400 underline"
                  >
                    Edit
                  </button>
                )}
              </div>
              <button
                onClick={(e) => {
                  handleEditNote(e);
                }}
                className="px-2"
              >
                <img src="/images/editButton.svg" className="m-1" />
              </button>
            </div>
          ))
        : null}

      {/* your modal for editing the notes */}
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          editNote={editNote}
          notesList={notesList}
          setNotesList={setNotesList}
          setWarning={setWarning}
        />
      )}
    </div>
  );
}
