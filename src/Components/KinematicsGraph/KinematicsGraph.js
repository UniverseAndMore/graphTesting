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
    // console.log(maxPos(data)[0]);
  });

  // Outputs in format [MAX TIME, MAX POS]
  const maxFromData = (d) => {
    const maxFromSet1 = d[0].data.reduce((acc, val) => {
      acc[0] = acc[0] === undefined || val.x > acc[0] ? val.x : acc[0];
      acc[1] = acc[1] === undefined || val.y > acc[1] ? val.y : acc[1];
      return acc;
    }, []);

    const maxFromSet2 = d[1].data.reduce((acc, val) => {
      acc[0] = acc[0] === undefined || val.x > acc[0] ? val.x : acc[0];
      acc[1] = acc[1] === undefined || val.y > acc[1] ? val.y : acc[1];
      return acc;
    }, []);

    return [
      Math.max(maxFromSet1[0], maxFromSet2[0]),
      Math.max(maxFromSet1[1], maxFromSet2[1]),
    ];
  };

  const [maxTime, maxPos] = maxFromData(data);

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 10, bottom: 58, left: 50 }}
      xScale={{ type: "linear", min: 0, max: 5 }} //maxTime < 2 ? 2 : "auto" }}
      yScale={{
        type: "linear",
        min: 0,
        max: 10, //maxPos > 5 ? maxPos : 5,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 3,
        tickRotation: 0,
        tickValues: 5,
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
      curve={"cardinal"}
      colors={["#d6195b", "#1c98fc"]}
      pointSize={0}
      lineWidth={7}
      pointLabel="y"
      pointLabelYOffset={-12}
      isInteractive={true}
      useMesh={true}
      animate={false}
      theme={graphSettings.theme}
    />
  );
};

export default KinematicsGraph;
