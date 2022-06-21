import Chart from "./Chart";

export default function Watchlist({ tab, stockData }: any): JSX.Element {
  return (
    <div className={tab === 1 ? "" : "hidden"}>
      {stockData.length ? (
        <div className="flex flex-wrap justify-evenly gap-y-4">
          {stockData.map((stock: any) => (
            <div className="w-48 border-2 rounded border-black" key={stock._id}>
              <div className="flex">
                <div
                  className={`px-1 rounded ${
                    stock.ticker === "SPY" ? "bg-yellow-200" : ""
                  }`}
                >
                  {stock.ticker}
                </div>
                <div className="flex-grow" />
                {stock.price[stock.price.length - 1]}
                <div
                  className={`ml-0.5 px-0.5 rounded text-white ${
                    parseFloat(
                      (
                        ((stock.price[stock.price.length - 1] -
                          stock.previousClosePrice) /
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
                    ((stock.price[stock.price.length - 1] -
                      stock.previousClosePrice) /
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
        <div className="flex justify-center">
          <div className="rounded-full w-4 h-4 border-4 border-t-orange-400 animate-spin mx-2 mt-1"></div>
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
}
