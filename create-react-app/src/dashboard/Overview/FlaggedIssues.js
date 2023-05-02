import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FlaggedIssues({ flaggedData }) {
  const unreadFlaggedIssues = flaggedData.filter(
    (f) => f.wasRead === false
  ).length;

  const readFlaggedIssues = flaggedData.filter(
    (f) => f.wasRead === true
  ).length;

  const doughnutData = {
    labels: ["Read", "Unread"],
    datasets: [
      {
        label: "Flagged Issues",
        data: [readFlaggedIssues, unreadFlaggedIssues],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Flagged Issues by read status",
        position: "top"
      },
    },
  };

  return (
    <>
      <Doughnut data={doughnutData} options={options} />
    </>
  );
}
