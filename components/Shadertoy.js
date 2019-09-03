import React from "react";
import { useReducer, useEffect, useRef } from "react";
import { Application, Filter, Graphics } from "pixi.js";

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

const fragmentPrefix = `
// precision highp float;

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
uniform vec2 iResolution;

// varying vec2 vUv;
varying vec2 vTextureCoord;

vec4 texture(sampler2D sampler, vec2 coord) {
  return texture2D(sampler, coord);
}

vec4 texture(sampler2D sampler, vec3 coord) {
  return texture2D(sampler, coord.xy);
}

vec4 texture(sampler2D sampler, vec4 coord) {
  return texture2D(sampler, coord.xy);
}

void mainImage( out vec4, vec2 fragCoord );

void main () {
  vec4 fragOutput;
  mainImage(fragOutput, iResolution * vTextureCoord);

  gl_FragColor = fragOutput;
}
`;

export default ({ width = 500, height = 500, shader, children }) => {
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

      const rect = new Graphics().drawRect(0, 0, width, height);

      const fragmentEnhanced = `${fragmentPrefix}
      ${shader}`;

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

  // TODO Add memorize

  return <div ref={pixiRef}>{children}</div>;
};
