import React, { useState } from "react";
import ReactResizeDetector from "react-resize-detector";

import Shadertoy from "./Shadertoy";
import shader from "../shader/fragment";

export default () => {
  const [{ width, height }, setSize] = useState({ width: 300, height: 300 });

  return (
    <div className="root">
      <style jsx>
        {`
          .root {
            width: 100%;
            height: 100%;
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
