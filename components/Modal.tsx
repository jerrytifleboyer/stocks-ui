import { useState } from "react";
import Header from "./Header";

export default function Modal({ editNote, setModalOpen }: any) {
  const [priceTarget, setPriceTarget] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const saveToDB = async () => {
    await fetch("api/notes", {
      method: "PATCH",
      body: JSON.stringify({ ticker: editNote.ticker, priceTarget, notes }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    editNote.priceTarget = priceTarget;
    editNote.notes = notes;
    saveToDB();
    closeModal();
  };

  return (
    <div className="absolute top-0 left-0 bg-black/25 h-screen w-screen flex justify-center items-center">
      <div className="border-2 w-1/2 h-1/2 bg-indigo-100 rounded-xl relative">
        <Header content={`Editing ${editNote.ticker} notes`} />
        <div className="flex justify-center items-center flex-col mb-4">
          <div className="font-bold block">Price Target:</div>
          <input
            className="pl-1"
            type="number"
            placeholder="e.g: 420.69"
            onChange={(e) => {
              setPriceTarget(e.target.value);
            }}
          />
        </div>

        <div className="flex justify-center items-center flex-col h-1/2">
          <div className="font-bold block">Notes:</div>
          <div className="h-full w-5/6">
            <textarea
              className="w-full h-full resize-none pl-1"
              placeholder="e.g: i like the stock!"
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          </div>
        </div>

        <footer className="absolute bottom-10 right-10">
          <button
            onClick={closeModal}
            className="rounded-xl px-2 py-1 bg-yellow-300 hover:bg-yellow-400 mr-2"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl px-2 py-1 bg-emerald-300 hover:bg-green-400"
          >
            Save
          </button>
        </footer>
      </div>
    </div>
  );
}
