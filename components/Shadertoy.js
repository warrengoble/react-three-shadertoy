import React from "react";
import { useEffect, useRef } from "react";

// TODO Add width and height props
export default ({ children }) => {
  const pixiRef = useRef();

  useEffect(() => {
    // pixiRef.current
  });

  return <div ref={pixiRef}>{children}</div>;
};
