# React Shadertoy Example

## Overview

TODO

Uses shadertoy format?

## Usage

Props Example

```jsx
<ShaderToy shader={shader} inputs={} />
```

    uniform float iTime -- shader playback time (in seconds).
    uniform float iTimeDelta -- Render time (in seconds).
    uniform int iFrame -- Shader playback frame.
    uniform vec2 iResolution -- viewport resolution (in pixels).
    uniform vec4 iDate -- (year, month, day, time in seconds).
    uniform vec4 iMouse -- mouse pixel coords. xy: current (if MLB down), zw: click.
    uniform sampler2D iChannel^n -- The textures input channel you've passed; numbered in the same order as the textures passed as prop in your react component.
    uniform vec3 iChannelResolution[n] -- An array containing the texture channel resolution (in pixels).
