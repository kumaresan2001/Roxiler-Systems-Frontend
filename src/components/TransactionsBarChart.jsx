// // src/components/TransactionsBarChart.js
// import axios from "axios";
// import { API } from "../global";
// import { Bar } from "react-chartjs-2";

// function TransactionsBarChart() {

//  useEffect(() => {
//     async function fetchBarChartData() {
//       try {
//         const response = await axios.get(
//           `${API}/bar-chart?month=${selectedMonth}`
//         );
//         setBarChartData(response.data);
//       } catch (error) {
//         console.error("Error fetching bar chart data", error);
//       }
//     }

//     fetchBarChartData();
//   }, [selectedMonth]);

//   const chartData = {
//     labels: Object.keys(data),
//     datasets: [
//       {
//         label: "Number of Items",
//         data: Object.values(data),
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Price Range Chart</h2>
//       <Bar data={chartData} />
//     </div>
//   );
// }

// export default TransactionsBarChart;
import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../global";
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

export function BarChart() {
  const [barChartData, setBarChartData] = useState({});
  const [data, setData] = useState([]);
  const [lab, setLab] = useState([]);
  let [month, setMonth] = useState("March");
  useEffect(() => {
    async function fetchBarChartData() {
      try {
        const response = await axios.get(`${API}/bar-chart/${month}`);
        console.log(response);
        setBarChartData(response.data.result);
        setLab(Object.keys(barChartData));
        setData(Object.values(barChartData));
        console.log(lab);
        console.log(barChartData);
      } catch (error) {
        console.error("Error fetching bar chart data", error);
      }
    }

    fetchBarChartData();
  }, [month]);

  return (
    <div>
      <div>
        <div className="select">
          <select
            className="dropdown-select"
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value={"January"}>January </option>
            <option value={"February"}>February</option>
            <option value={"March"} selected>
              March
            </option>
            <option value={"April"}>April</option>
            <option value={"May"}>May</option>
            <option value={"June"}>June</option>
            <option value={"July"}>July</option>
            <option value={"August"}>August</option>
            <option value={"September"}>September</option>
            <option value={"October"}>October</option>
            <option value={"November"}>November</option>
            <option value={"December"}>December</option>
          </select>
        </div>
      </div>
      <h1>
        Bar Cart Stats-<span>{month}</span>
      </h1>
      <Bar
        options={options}
        data={{
          labels: lab,
          datasets: [
            {
              label: "Number of Items",
              data: data,
              //data:mydata,
              backgroundColor: "blue",
            },
          ],
        }}
      />
    </div>
  );
}
