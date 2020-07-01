import React, { useState, useEffect, useRef, useCallback } from "react";
import KinematicsGraph from "./Components/KinematicsGraph/KinematicsGraph";
import ObjectAxisArea from "./Components/ObjectAxisArea/ObjectAxisArea";
import MatterScene from "./Components/ObjectAxisArea/MatterScene/MatterScene";
import "./index.css";
import styles from "./App.module.css";

const TIMESTEP = 50; //ms
const MAX_TIME = 5; //s

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
}

let dataToAdd = [];

const App = () => {
  const [data, setData] = useState([
    {
      id: "dataSet1",
      color: "#d6195b",
      data: [],
    },
    {
      id: "dataSet2",
      color: "#1c98fc",
      data: [],
    },
  ]);

  const addNewData = () => {
    const dataIndex = data[0].data.length;

    if (dataIndex && data[0].data[dataIndex - 1].x >= MAX_TIME) return;

    setData((prevData) => {
      return [
        {
          ...prevData[0],
          data: [
            ...prevData[0].data,
            {
              x: !prevData[0].data.length
                ? 0
                : prevData[0].data[prevData[0].data.length - 1].x +
                  TIMESTEP / 1000,
              y: dataToAdd[0] / 100,
            },
          ],
        },
        {
          ...prevData[1],
          data: [
            ...prevData[1].data,
            {
              x: !prevData[1].data.length
                ? 0
                : prevData[1].data[prevData[1].data.length - 1].x +
                  TIMESTEP / 1000,
              y: dataToAdd[1] / 100,
            },
          ],
        },
      ];
    });
  };

  useInterval(addNewData, TIMESTEP);

  const setObjectPosition = useCallback(
    (newX, newY) => {
      dataToAdd[0] = newX;
      dataToAdd[1] = newY;
    },
    [dataToAdd]
  );

  const objectAxisArea = (
    <ObjectAxisArea setPosX={(newX) => setObjectPosition(newX)} />
  );

  useEffect(() => {
    console.log("RENDER APP");
  });

  return (
    <div className={styles.App}>
      <div className={styles.KinematicsGraphContainer}>
        {<KinematicsGraph data={data} />}
      </div>
      <div className={styles.MatterSceneContainer}>
        <MatterScene setPosX={(newX, newY) => setObjectPosition(newX, newY)} />
      </div>
      {/* <div className={styles.ObjectAxisAreaContainer}>{objectAxisArea}</div> */}
    </div>
  );
};

export default App;
