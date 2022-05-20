import Chart from "./Chart";

export default function Watchlist({ tab, stockData }: any) {
  return (
    <div className={tab === 1 ? "" : "hidden"}>
      {stockData.length ? (
        <div className="flex flex-wrap justify-evenly gap-y-4">
          {stockData.map((stock: any) => (
            <div className="w-48 border-2 rounded border-black" key={stock._id}>
              <div className="flex">
                <div className="px-1">{stock.ticker}</div>
                <div className="flex-grow" />
                <div
                  className={
                    stock.price[stock.price.length - 1] >
                    stock.previousClosePrice
                      ? "text-emerald-600"
                      : "text-red-700"
                  }
                >
                  {stock.price[stock.price.length - 1]}
                </div>
                <div className="px-1">
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
        <div className="flex justify-center">Loading...</div>
      )}
    </div>
  );
}
