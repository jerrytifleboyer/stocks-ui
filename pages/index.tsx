import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Watchlist from "../components/Watchlist";
import Notes from "../components/Notes";
import checkIfMarketOpen from "../backend/checkIfMarketOpen";

const everyTwoMinutes = 1000 * 60 * 2;

export default function index() {
  const marketOpen = checkIfMarketOpen();
  const [stockData, setStockData] = useState<object[]>([]);
  const [tab, setTab] = useState<number>(1);

  //fetches data every 2 minutes when market is open
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/watchlist");
        const data = await response.json();
        setStockData(data);
      } catch {
        console.log("could not get watchlist data");
      }
      if (marketOpen) {
        setTimeout(getData, everyTwoMinutes);
      }
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-indigo-300">
      <Header content="My Stock Watchlist" />
      <Tabs tab={tab} setTab={setTab} />
      <div className="flex justify-center content-center">
        <div className="py-4 w-4/5 border-2 bg-indigo-50 rounded mb-4">
          <Watchlist tab={tab} stockData={stockData} />
          <Notes tab={tab} />
        </div>
      </div>
    </div>
  );
}
