import { useState } from "react";

export function Modal({
  setModalOpen,
  editNote,
  notesList,
  setNotesList,
  setWarning,
}: any): JSX.Element {
  const [priceTarget, setPriceTarget] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const { ticker, name, date, price } = editNote;

  const noteStructure = {
    ticker,
    name,
    date,
    price,
    priceTarget: priceTarget.trim(),
    notes: notes.trim(),
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const saveToDB = async () => {
    try {
      await fetch("api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteStructure),
      });
    } catch {
      setWarning("i could not save this note, database error");
    }
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    for (let position in notesList) {
      if (notesList[position].ticker === ticker) {
        notesList.splice(position, 1, noteStructure);
        setNotesList(notesList);
        saveToDB();
        closeModal();
        return;
      }
    }
  };

  return (
    <div className="absolute top-0 left-0 bg-black/25 w-full h-full">
      <form
        onSubmit={handleSave}
        className="h-screen flex justify-center items-center"
      >
        <div className="border w-2/5 bg-indigo-100 rounded-xl">
          <div className="flex justify-center font-bold mt-4">{ticker}</div>
          <div className="flex justify-center items-center flex-col mb-4">
            <div className="font-bold block pt-4">Price Target:</div>
            <input
              className="pl-1"
              type="number"
              placeholder="e.g: 420.69"
              maxLength={7}
              onChange={(e) => {
                setPriceTarget(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-center items-center flex-col h-1/2">
            <div className="font-bold block">Notes:</div>
            <textarea
              className="w-5/6 h-24 resize-none pl-1"
              placeholder="e.g: i like the stock!"
              maxLength={255}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          </div>

          <footer className="flex justify-end p-8">
            <button
              type="button"
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
