// import React from "react";
// import ReactDOM from "react-dom";
// import { App } from "./components";

// ReactDOM.render(<App apiKey={process.env.API_KEY} />, document.getElementById("root"));

import Bundler from 'parcel-bundler';
import Koa from 'koa'

const app = new Koa();
const bundler = new Bundler('index.pug', {});

app.use(bundler.middleware());
app.listen(1234);
