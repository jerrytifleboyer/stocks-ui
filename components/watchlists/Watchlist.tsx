import { Chart } from "./Chart";
import { checkIfMarketOpen } from "../../backend/checkIfMarketOpen";
import { useFetch } from "../../helpers/hooks/useFetch";
import { Loading } from "../Loading";

export function Watchlist({ tab }: any): JSX.Element {
  const { data } = useFetch("/api/watchlist", checkIfMarketOpen());
  return (
    <div className={tab === 1 ? "" : "hidden"}>
      {data.length ? (
        <div className="flex flex-wrap justify-evenly gap-y-4">
          {data.map((stock: any) => (
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
