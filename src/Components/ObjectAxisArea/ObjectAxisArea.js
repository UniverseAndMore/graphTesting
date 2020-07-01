import React, { useEffect } from "react";
import styles from "./ObjectAxisArea.module.css";
import DraggableObject from "./DraggableObject";

const ObjectAxisArea = (props) => {
  useEffect(() => {
    console.log("RENDER AREA");
  });
  return (
    <div className={styles.ObjectAxisArea}>
      <DraggableObject setPosX={props.setPosX} />
    </div>
  );
};

export default React.memo(ObjectAxisArea);
