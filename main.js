const Bundler = require("parcel-bundler");
const app = require("express")();

const bundler = new Bundler("index.pug", {});

app.use(bundler.middleware());
app.listen(1234);
