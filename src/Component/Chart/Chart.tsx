import React, { useState, useEffect } from "react";

import Axios from "axios";

import { Props, ChartData } from "../../types";
import { getRandomNumber } from "../../helper";

import Loader from "react-loader-spinner";
import { Pie } from "react-chartjs-2";

interface ChartProps extends Props {}

const ChartEl: React.FC<ChartProps> = ({ setId, setToken }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const cancelToken = Axios.CancelToken.source();
    const timeId = window.setTimeout(() => {
      Axios.get(
        "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
        {
          cancelToken: cancelToken.token,
        }
      )
        .then((res) => {
          const data: Partial<ChartData> = {
            labels: [],
            datasets: [
              {
                label: "Population Graph",
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
                data: [],
              },
            ],
          };
          console.log("chart data", res);

          res.data.data.forEach((el: { Year: string; Population: number }) => {
            data.labels?.push(el["Year"]);
            data.datasets && data.datasets[0].data.push(el.Population);
          });

          setChartData(data as ChartData);
        })
        .catch((err) => {
          console.log(err);
          setError("No Chart Data Found From API");
        });
    }, 1000 * getRandomNumber(6, 9));

    setId(timeId);
    setToken(cancelToken);
  }, [setId, setToken]);

  return (
    <div
      className={`mx-auto chart-container text-center ${!chartData && "py-5"}`}
    >
      {chartData ? (
        <Pie data={chartData} type="" />
      ) : error ? (
        error
      ) : (
        <Loader type="Puff" color="#007bff" />
      )}
    </div>
  );
};

export default ChartEl;
