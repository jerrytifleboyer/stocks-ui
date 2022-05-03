import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Watchlist from "../components/Watchlist";
import Notes from "../components/Notes";
import checkIfMarketOpen from "../backend/checkIfMarketOpen";

const everyTwoMinutes = 1000 * 120;

export default function index() {
  const { marketOpen } = checkIfMarketOpen();
  const [stockData, setStockData] = useState<any[]>([]);
  const [tab, setTab] = useState<number>(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const request = await fetch("/api/watchlist");
        const data = await request.json();
        setStockData(data);
      } catch {
        console.log("could not fetch data");
      }
      if (marketOpen) {
        setTimeout(getData, everyTwoMinutes);
      }
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-indigo-500">
      <Header />
      <Tabs tab={tab} setTab={setTab} />
      <div className="flex justify-center content-center">
        <div className="py-4 w-4/5 border-2 bg-indigo-50 rounded">
          <Watchlist tab={tab} stockData={stockData} />
          <Notes tab={tab} stockData={stockData} />
        </div>
      </div>
    </div>
  );
}
