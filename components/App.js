import React from "react";
import Shadertoy from "./Shadertoy";

export default () => {
  return (
    <div className="root">
      <style jsx>
        {`
          .root {
            width: 500px;
            height: 500px;
          }
        `}
      </style>
      <Shadertoy width={500} height={500} />
    </div>
  );
};
