(global as any).WebSocket = require("ws");
(global as any).XMLHttpRequest = require("xhr2");

import "zone.js/dist/zone-node";
import {enableProdMode} from "@angular/core";
// Express Engine
import {ngExpressEngine} from "@nguniversal/express-engine";
// Import module map for lazy loading
import {provideModuleMap} from "@nguniversal/module-map-ngfactory-loader";

import * as express from "express";
import {resolve} from "path";

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
export const app = express();

const DIST_FOLDER = resolve(process.cwd(), "dist/browser");

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require("./dist/server/main");

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  "html",
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set("view engine", "html");
app.set("views", DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Serve static files from /browser
app.get(
  "**/*.*",
  express.static(DIST_FOLDER, {
    maxAge: "1w"
  })
);

// All regular routes use the Universal engine
app.get("*", (req, res) => {
  console.log(`Express Request Url: ${req.url}`);
  res.render("index", {req});
});

// Start up the Node server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Node Express server listening on http://localhost:${PORT}`);
// });
