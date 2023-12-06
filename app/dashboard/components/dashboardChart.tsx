import React from 'react'
import { Bar } from 'recharts';

function DahboardChart() {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "orders Revenue",
        },
      },
    };
    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ];
  
    const data = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: labels.map(() => Math.random() * 1000),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Dataset 2",
          data: labels.map(() => Math.random() * 1000),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    return(
        <h1>Hi, Welcome</h1>
    )};
