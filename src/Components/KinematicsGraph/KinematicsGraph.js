import React, { useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";

const KinematicsGraph = ({ data }) => {
  const graphSettings = {
    theme: {
      xScale: {},
      axis: {
        ticks: {
          text: {
            fontSize: 14,
            fill: "#cccccc",
          },
        },
        legend: {
          text: {
            fontSize: 20,
            fill: "#333333",
          },
        },
      },
    },
  };

  useEffect(() => {
    console.log("RENDER GRAPH");
  });

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 10, bottom: 58, left: 50 }}
      xScale={{ type: "linear" }}
      yScale={{
        type: "linear",
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 3,
        tickRotation: 0,
        legend: "time",
        legendOffset: 40,
        legendPosition: "middle",
        fontSize: "3rem",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "position",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={"orangered"}
      pointSize={0}
      lineWidth={5}
      pointColor={"white"}
      pointLabel="y"
      pointLabelYOffset={-12}
      isInteractive={true}
      useMesh={true}
      animate={true}
      motionStiffness={230}
      motionDamping={24}
      theme={graphSettings.theme}
    />
  );
};

export default KinematicsGraph;
