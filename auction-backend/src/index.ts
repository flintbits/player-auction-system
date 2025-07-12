import * as dotenv from "dotenv";
dotenv.config();
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import teamsApis from "./APIs/team.api.js";
import connection from "./mongodb_connection.js";
import { logger } from "hono/logger";
import { customLogger } from "./custom_logger.js";
import playersApis from "./APIs/players.api.js";
import auctionApis from "./APIs/auction.api.js";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

connection.then(() => {
  app.use(logger(customLogger));
  app.use(cors());
  app.get("/", (c) => {
    return c.text("Hello Hono!");
  });
  app.route("/teams", teamsApis);
  app.route("/players", playersApis);
  app.route("/auction", auctionApis);
  app.use('/playerPic/*', serveStatic({
    root: 'asset/',
  }))
  app.use('/teamLogo/*', serveStatic({
    root: 'asset/',
  }))
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
