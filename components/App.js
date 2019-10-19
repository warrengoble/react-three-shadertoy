import React, { useState } from "react";
import ReactResizeDetector from "react-resize-detector";

import Shadertoy from "react-shadertoy";
import shader from "../shader/fragment";

export default () => {
  const [{ width, height }, setSize] = useState({ width: 300, height: 300 });

  return (
    <div className="root">
      <style jsx global>
        {`
          body {
            position: relative;
            margin: 0;
            padding: 0;
            background-color: #ddd;
            font-family: Arial;
            font-size: 12px;
          }
        `}
      </style>
      <style jsx>
        {`
          .root {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }
        `}
      </style>
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={(width, height) => {
          setSize({ width, height });
        }}
      />
      <Shadertoy width={width} height={height} shader={shader} />
    </div>
  );
};
