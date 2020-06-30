import React, { useState, useEffect, useMemo, useCallback } from "react";
import KinematicsGraph from "./Components/KinematicsGraph/KinematicsGraph";
import ObjectAxisArea from "./Components/ObjectAxisArea/ObjectAxisArea";
import "./index.css";
import styles from "./App.module.css";
import dataRef from "./data";

let dataToAdd;

function App() {
  const [data, setData] = useState(dataRef);

  const setObjectPosition = (newX) => {
    dataToAdd = newX;
  };

  const updateGraph = useCallback(() => {
    setData((prevData) => {
      return [
        {
          id: "positionTimeData",
          data: [
            ...prevData[0].data,
            {
              x: prevData[0].data.length
                ? prevData[0].data[prevData[0].data.length - 1].x + 0.1
                : 0,
              y: dataToAdd / 100,
            },
          ],
        },
      ];
    });
  }, [dataToAdd]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateGraph();
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.KinematicsGraphContainer}>
        {<KinematicsGraph data={data} />}
      </div>
      <div className={styles.ObjectAxisAreaContainer}>
        <ObjectAxisArea setPosX={(newX) => setObjectPosition(newX)} />
      </div>
    </div>
  );
}

export default App;
