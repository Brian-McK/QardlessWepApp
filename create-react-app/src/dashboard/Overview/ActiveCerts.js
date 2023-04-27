import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const now = dayjs();

export default function ActiveCerts({ certData }) {

  const numActiveCerts = certData.filter((c) => c.isFrozen === false).length;
  const numFrozenCerts = certData.filter((c) => c.isFrozen === true).length;
  const numExpiredCerts = certData.filter(
    (c) => dayjs(c.course.expiry) > now
  ).length;

  const doughnutData = {
    labels: ["Active", "Frozen", "Expired"],
    datasets: [
      {
        label: "Certificates",
        data: [numActiveCerts, numFrozenCerts, numExpiredCerts],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 5,
      },
    ],
  };

  return (
    <>
      <Doughnut data={doughnutData} />
    </>
  );
}
