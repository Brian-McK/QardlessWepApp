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
import { object } from "yup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CoursesPopularity({ certData }) {

  // console.log(JSON.stringify(certData, null, 4));

  const courseCounts = {};

  certData.forEach(cert => {
    const courseName = cert.course.title;
    if (!courseCounts[courseName]) {
      courseCounts[courseName] = 1;
    } else {
      courseCounts[courseName]++;
    }
  });

  const labels = Object.keys(courseCounts);

  const values = Object.values(courseCounts);


  const barchartData = {
    labels:  labels,
    datasets: [
      {
        label: `Most popular courses`,
        data: values,
        backgroundColor: [
          "rgb(255, 99, 132)",
        ],
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Courses",
          colour: "black",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of certificates assigned",
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
