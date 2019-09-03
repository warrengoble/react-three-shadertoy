import React from "react";
import { useReducer, useEffect, useRef } from "react";
import { Application, Filter, Graphics } from "pixi.js";

import fragment from "./fragment";

// Action types
const MOUNTED = "MOUNTED";

// Reducers
const initialState = {};

const reducer = (state, { type, app, rect }) => {
  switch (type) {
    case MOUNTED:
      return { ...state, app, rect };
    default:
      return state;
  }
};

export default ({ width = 500, height = 500, children }) => {
  const pixiRef = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const { app } = state;

    if (!app) {
      console.log("Mounting");

      const app = new Application({
        width,
        height
      });

      const rect = new Graphics()
        .beginFill(0x00ff00)
        .drawRect(0, 0, width, height);

      const fragmentEnhanced = `
      uniform vec3 iResolution;
      uniform float iTime;
      uniform float iTimeDelta;
      uniform int iFrame;
      uniform float iChannelTime[4];
      uniform vec3 iChannelResolution[4];
      uniform vec4 iMouse;
      uniform sampler2D iChannel0;
      uniform sampler2D iChannel1;
      uniform sampler2D iChannel2;
      uniform sampler2D iChannel3;
      uniform vec4 iDate;
      uniform float iSampleRate;

      ${fragment}
      `;

      rect.filters = [new Filter(null, fragmentEnhanced)];
      app.stage.addChild(rect);

      app.ticker.add(delta => {
        // Update uniforms
      });

      pixiRef.current.appendChild(app.view);

      dispatch({ type: MOUNTED, app, rect });
    }

    // TODO Unmount
    // return () => {
    //   //
    //   // console.log("Cleaned up");
    //   // window.removeEventListener("mousemove", logMousePosition);
    // };
  });

  return <div ref={pixiRef}>{children}</div>;
};
