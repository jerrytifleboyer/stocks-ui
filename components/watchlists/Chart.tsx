import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  annotationPlugin
);

export function Chart({ stockData }: any): JSX.Element {
  let data: any = {
    labels: stockData.time,
    datasets: [
      {
        label: "stock price",
        data: stockData.price,
        borderColor: ["rgba(153, 102, 255, 1)"],
        borderWidth: 2,
      },
    ],
  };
  let options: any = {
    scales: {
      y: {
        beginAtZero: false,
      },
      x: {
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: stockData.previousClosePrice,
            yMax: stockData.previousClosePrice,
            borderColor: "rgb(0,0,0)",
            borderWidth: 2,
            borderDash: [8],
          },
        },
      },
    },
  };
  //i have no idea how to fix this typescript, but it works
  return <Line data={data} options={options} />;
}
