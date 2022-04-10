import React, { useState, useEffect } from "react";
import Chart from "../components/Chart";
import Header from "../components/Header";

export default function index() {
  const [stockData, setStockData] = useState<any[]>([]);
  const getData = async () => {
    try {
      const request = await fetch("/api");
      const data = await request.json();
      setStockData(data);
    } catch {
      console.log("could not fetch stock data");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-400 to-indigo-500">
      <Header />
      <div className="flex justify-center content-center">
        <div className="my-4 py-4 w-3/4 border-2 bg-zinc-300 rounded">
          <div className="flex flex-wrap justify-evenly gap-y-4">
            {stockData.map((stock) => (
              <div
                className="w-64 border-2 rounded border-black"
                key={stock._id}
              >
                <div className="flex">
                  <div className="px-2">{stock.ticker}</div>
                  <div className="flex-grow" />
                  <div
                    className={
                      stock.price[stock.price.length - 1] >
                      stock.previousClosePrice
                        ? "text-emerald-600"
                        : "text-red-700"
                    }
                  >
                    {stock.price[stock.price.length - 1].toFixed(2)}
                  </div>
                  <div className="px-1">
                    (
                    {(
                      ((stock.price[stock.price.length - 1] -
                        stock.previousClosePrice) /
                        stock.previousClosePrice) *
                      100
                    ).toFixed(2)}
                    % )
                  </div>
                </div>
                <Chart stockData={stock} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
