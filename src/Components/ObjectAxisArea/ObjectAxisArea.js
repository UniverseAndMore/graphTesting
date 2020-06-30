import React, { useState } from "react";
import styles from "./ObjectAxisArea.module.css";
import DraggableObject from "./DraggableObject";

const ObjectAxisArea = (props) => {
  return (
    <div className={styles.ObjectAxisArea}>
      <DraggableObject setPosX={props.setPosX} />
    </div>
  );
};

export default ObjectAxisArea;
