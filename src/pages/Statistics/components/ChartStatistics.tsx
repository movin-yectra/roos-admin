import React from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ChartStatistics: React.FC = () => {
  const options: Options = {
    chart: {
      borderRadius: 5,
    },
    plotOptions: {
      bar: {
        states: {
          hover: {
            color: "red",
          },
        },
      },
    },
    title: {
      text: "Order Statistics",
      align: "center",
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },
    colors: ["#E2FBD7", "#34B53A"],
    xAxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    series: [
      {
        type: "column",
        name: "Orders",
        borderRadius: 5,
        colorByPoint: true,
        data: [200, 900, 500, 300, 800, 600, 700],
        showInLegend: false,
      },
    ],
  };

  return (
    <div id="chart" className="mt-4 bg-light">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartStatistics;
