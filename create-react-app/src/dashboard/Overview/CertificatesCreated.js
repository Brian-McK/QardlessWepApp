import * as React from "react";
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
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const currentYear = dayjs().year();

export default function CertificatesCreated({ certData }) {
  // only get certs created in current year
  const currentYearCerts = certData.filter((c) => {
    return dayjs(c.createdAt).year() === currentYear;
  });

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const certsCreatedPerMonth = [];

  const countOccurrences = (array, value) => {
    return array.reduce((count, obj) => {
      return count + (dayjs(obj.createdAt).month() == value);
    }, 0);
  };

  labels.map((month, index) => {
    certsCreatedPerMonth.push(countOccurrences(currentYearCerts, index));
  });

  const barchartData = {
    labels: labels,
    datasets: [
      {
        label: `Certificates Created in ${currentYear}`,
        data: certsCreatedPerMonth,
        backgroundColor: ["rgb(255, 99, 132)"],
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          colour: "black",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of certs",
          colour: "black",
        },
      },
    },
  };

  return (
    <>
      <Bar data={barchartData} options={options} />
    </>
  );
}
