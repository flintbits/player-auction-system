import { Hono } from "hono";
import { Players, type IPlayer } from "../database/playerSchema.js";
import { customLogger } from "../custom_logger.js";
import { readdirSync, readFileSync } from "fs";
import { loadPlayerToDatabase } from "../util/excelToJson.js";

const playersApis = new Hono();

playersApis.get("/", async (c) => {
  const players = await Players.find();
  customLogger(`Players found: ${players.length}`);
  return c.json(players);
});

playersApis.get("/unsold", async (c) => {
  const players = await Players.find({ markUnsold: true });
  customLogger(`Players found: ${players.length}`);
  return c.json(players);
});

playersApis.get("/sold", async (c) => {
  const players = await Players.find({ team: { $exists: false } });
  customLogger(`Players found: ${players.length}`);
  return c.json(players);
});

playersApis.post("/", async (c) => {
  let player = await c.req.json<IPlayer>();
  customLogger("Adding new player", JSON.stringify(player));
  try {
    const playerDocument = new Players(player);
    await playerDocument.save();
    return c.json({
      status: "success",
    });
  } catch (error) {
    return c.json({
      status: "failure",
    });
  }
});

playersApis.get("/:playerId", async (c) => {
  let playerId = c.req.param("playerId");
  customLogger(`Fetching player: ${playerId}`);
  try {
    const player = await Players.findById(playerId);
    return c.json(player);
  } catch (error) {
    return c.json({
      status: "failure",
    });
  }
});

playersApis.get("/playerByNumber/:playerId", async (c) => {
  let playerId = c.req.param("playerId");
  customLogger(`Fetching player: ${playerId}`);
  try {
    const player = await Players.findOne({referanceNumber: playerId})
    return c.json(player);
  } catch (error) {
    return c.json({
      status: "failure",
    });
  }
});

playersApis.put("/:playerId", async (c) => {
  let playerId = c.req.param("playerId");
  let player = await c.req.json<IPlayer>();
  customLogger(`Updating player: ${playerId}`, JSON.stringify(player));
  try {
    await Players.findByIdAndUpdate(playerId, player);
    return c.json({
      status: "success",
    });
  } catch (error) {
    return c.json({
      status: "failure",
    });
  }
});

playersApis.delete("/:playerId", async (c) => {
  let playerId = c.req.param("playerId");
  customLogger(`Deleting player: ${playerId}`);
  try {
    await Players.findByIdAndDelete(playerId);
    return c.json({
      status: "success",
    });
  } catch (error) {
    return c.json({
      status: "failure",
    });
  }
});

playersApis.delete("/", async (c) => {
  let confirmation = c.req.query("isAll");
  customLogger(`Deleting All player`);
  try {
    if (confirmation?.toLocaleLowerCase() === "true") {
      await Players.deleteMany({});
      return c.json({
        status: "success",
      });
    }
  } catch (error) {
    return c.json({
      status: "failure",
    });
  }
});

playersApis.get("/image/:pathToImage", async (c)=>{
  let pathToImage = c.req.param("pathToImage"); 
  const imageBuffer = readFileSync(`asset/playerPic/${pathToImage}`);
  const base64String = imageBuffer.toString('base64');
  return c.text(base64String)
})

playersApis.patch("/updatePic", async (c) => {
  var files = readdirSync("asset/players/");
  console.log(files);
  // Will write the logic tomorrow
  return c.json({
    result: "success",
  });
});

playersApis.get("/addAllPlayers/", async (c)=>{

  return c.json(await loadPlayerToDatabase(Players))
})

export default playersApis;
