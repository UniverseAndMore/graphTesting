import React, { useEffect, useState, useRef, useCallback } from "react";
import Matter from "matter-js";

const MatterScene = (props) => {
  const scene = useRef(null);
  const [state, setState] = useState({ render: null });

  useEffect(() => {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create({
      // positionIterations: 20
    });

    const width = 1000;
    const height = 200;

    var render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
      },
    });

    var wallPadding = 20;
    var wallThickness = 200;

    var ballA = Bodies.circle(410, 100, 30, {
      restitution: 0.85,
      friction: 0.01,
    });
    var ballB = Bodies.circle(110, 50, 30, {
      restitution: 0.85,
      friction: 0.01,
    });

    World.add(engine.world, [
      // walls
      Bodies.rectangle(
        width / 2,
        wallPadding - wallThickness / 2,
        width,
        wallThickness,
        {
          isStatic: true,
        }
      ),
      Bodies.rectangle(
        wallPadding - wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        {
          isStatic: true,
        }
      ),
      Bodies.rectangle(
        width / 2,
        height - wallPadding + wallThickness / 2,
        width,
        wallThickness,
        { isStatic: true }
      ),
      Bodies.rectangle(
        width - wallPadding + wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        { isStatic: true }
      ),
    ]);

    World.add(engine.world, [ballA, ballB]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.06,
          damping: 0.2,
          render: {
            visible: false,
          },
        },
      });

    World.add(engine.world, mouseConstraint);

    // Matter.Events.on(mouseConstraint, "mousedown", function (event) {
    //   World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    // });

    Engine.run(engine);

    Render.run(render);

    setState({
      render: render,
    });
  }, []);

  useEffect(() => {
    state.render &&
      props.setPosX(
        state.render.engine.world.bodies[5].position.x, //red ball
        state.render.engine.world.bodies[4].position.x //blue ball
      );
  });

  return <div ref={scene} />;
};

export default MatterScene;
