import { Chart } from "./Chart";
import { Loading } from "../Loading";
import { checkIfMarketOpen } from "../../backend/checkIfMarketOpen";
import { TickerDataInterface } from "../../helpers/interfaces/FrontendInterfaces";
import { SearchBar } from "../SearchBar";
import { useState, useEffect } from "react";

export function Watchlist({
  tab,
  checklist,
}: {
  tab: number;
  checklist: TickerDataInterface[];
}): JSX.Element {
  let foundInWatchlist = false;
  const [myWatchlist, setMyWatchlist] = useState<TickerDataInterface[]>([]);
  const [ticker, setTicker] = useState<string>(""); //used to do a post request to add a stock to my watchlist, and then find it in the checklist to add to my view
  const [warning, setWarning] = useState<string>("");

  const EVERY_TWO_MINUTES = 1000 * 60 * 2;

  useEffect(() => {
    const getWatchlist = async () => {
      const response = await fetch("/api/watchlist");
      const data = await response.json();
      setMyWatchlist(data);
      if (checkIfMarketOpen()) {
        setTimeout(getWatchlist, EVERY_TWO_MINUTES);
      }
    };
    getWatchlist();
  }, []);

  const saveToDB = async (ticker: String) => {
    try {
      await fetch("api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticker }),
      });
    } catch {
      setWarning(`${ticker} was not recorded, database error`);
    }
  };

  const addToWatchlist = () => {
    for (let chart of checklist) {
      if (ticker === chart.ticker) {
        const addChart = [...myWatchlist, chart];
        setMyWatchlist(addChart);
        saveToDB(chart.ticker);
        return;
      }
    }
    setWarning("we don't carry that stock, maybe you can suggest it");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //stops you from adding the same chart
    if (myWatchlist.length) {
      for (let stock of myWatchlist) {
        if (ticker === stock.ticker) {
          setWarning(`${ticker} is already in your watchlist`);
          foundInWatchlist = true;
          break;
        }
      }
      //it's not in your watchlist, add it
      if (!foundInWatchlist) {
        addToWatchlist();
      }
    }
    //adding your first chart
    else {
      addToWatchlist();
    }
    e.target.reset();
  };

  return (
    <div className={tab === 1 ? "" : "hidden"}>
      <div className="flex justify-center text-red-500">{warning}</div>
      <SearchBar
        handleSubmit={handleSubmit}
        setTicker={setTicker}
        setWarning={setWarning}
        contentLoaded={myWatchlist}
      />
      {myWatchlist.length ? (
        <div className="flex flex-wrap justify-evenly gap-y-4 mt-4">
          {myWatchlist.map((stock: any) => (
            <div className="w-48 border-2 rounded border-black" key={stock._id}>
              <div className="flex">
                <div
                  className={`px-1 rounded ${
                    stock.ticker === "SPY" ? "bg-yellow-400" : ""
                  }`}
                >
                  {stock.ticker}
                </div>
                <div className="flex-grow" />
                {stock.currentPrice}
                <div
                  className={`ml-0.5 px-0.5 rounded text-white ${
                    parseFloat(
                      (
                        ((stock.currentPrice - stock.previousClosePrice) /
                          stock.previousClosePrice) *
                        100
                      ).toFixed(2)
                    ) > 0
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                >
                  (
                  {(
                    ((stock.currentPrice - stock.previousClosePrice) /
                      stock.previousClosePrice) *
                    100
                  ).toFixed(2)}
                  %)
                </div>
              </div>
              <Chart stockData={stock} />
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
