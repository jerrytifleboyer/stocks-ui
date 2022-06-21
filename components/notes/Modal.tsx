import { useState } from "react";

export default function Modal({ editNote, setModalOpen }: any): JSX.Element {
  const [priceTarget, setPriceTarget] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const saveToDB = async () => {
    await fetch("api/notes", {
      method: "PATCH",
      body: JSON.stringify({
        ticker: editNote.ticker,
        priceTarget: priceTarget.trim(),
        notes: notes.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    editNote.priceTarget = priceTarget.trim();
    editNote.notes = notes.trim();
    saveToDB();
    closeModal();
  };

  return (
    <form
      onSubmit={handleSave}
      className="absolute top-0 left-0 right-0 bottom-0 bg-black/25 w-full flex justify-center items-center"
    >
      <div className="border w-2/5 bg-indigo-100 rounded-xl">
        <div className="flex justify-center items-center flex-col mb-4">
          <div className="font-bold block pt-8">Price Target:</div>
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
          <textarea
            className="w-5/6 h-24 resize-none pl-1"
            placeholder="e.g: i like the stock!"
            onChange={(e) => {
              setNotes(e.target.value);
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
  );
}
