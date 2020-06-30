import React, { useState, useMemo, useCallback, useEffect } from "react";
// import styled, { css } from "styled-components";
import styles from "./DraggableObject.module.css";

const POSITION = { x: 0, y: 0 };

const DraggableObject = (props) => {
  // TURN ON TO LOG DRAG DATA

  //   useEffect(() => {
  //     console.log(
  //       "Origin X: " + state.origin.x + "   Origin Y: " + state.origin.y
  //     );
  //     console.log(
  //       "Translation X: " +
  //         state.translation.x +
  //         "   Translation Y: " +
  //         state.translation.y
  //     );
  //   });

  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  });

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState((prevState) => ({
      ...prevState,
      isDragging: true,
      origin: {
        x: clientX - prevState.translation.x,
        y: clientY - prevState.translation.y,
      },
    }));
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX - state.origin.x,
        y: clientY - state.origin.y,
      };

      setState((prevState) => ({
        ...prevState,
        translation,
      }));
    },
    [state.origin]
  );

  const handleMouseUp = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isDragging: false,
    }));
  }, []);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    // setState((prevState) => ({ ...prevState, translation: POSITION }));
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${state.translation.x}px,${state.translation.y}px`,
      transition: state.isDragging ? "none" : "transform 500ms",
      zIndex: state.isDragging ? 2 : 1,
      position: state.isDragging ? "absolute" : "relative",
      width: "80px",
      height: "80px",
      backgroundColor: "yellow",
    }),
    [state.isDragging, state.translation]
  );

  useEffect(() => {
    props.setPosX(state.translation.x);
  }, [state.translation]);

  return <div style={styles} onMouseDown={handleMouseDown} />;
};

export default DraggableObject;
