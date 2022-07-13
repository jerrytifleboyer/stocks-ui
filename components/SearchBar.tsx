export default function SearchBar({
  handleSubmit,
  setTicker,
  setWarning,
  contentLoaded,
}: any) {
  return (
    <form className="mb-2" onSubmit={handleSubmit}>
      <div className="flex justify-center items-center">
        <input
          placeholder="Search for ticker..."
          className="w-64 truncate mx-1 p-1"
          onChange={(e) => {
            setTicker(e.target.value.toUpperCase().trim());
            setWarning("");
          }}
        />
        <div className="relative">
          <button
            type="submit"
            className="rounded bg-indigo-400 text-white px-2 py-1 mx-1 truncate hover:bg-indigo-500"
          >
            Add
          </button>
          {!contentLoaded.length && (
            <div className="absolute top-0 inline-block whitespace-nowrap pt-1 animate-pulse">
              ← Start by searching for a ticker
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
