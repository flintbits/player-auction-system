import { Hono } from "hono";
import { Teams, type ITeams } from "../database/teamsSchema.js";
import { customLogger } from "../custom_logger.js";
import { loadTeams } from "../util/excelToJson.js";

const teamsApis = new Hono();

teamsApis.get("/", async (c) => {
  const teams = await Teams.find();
  customLogger(`Teams found: ${teams.length}`);
  return c.json(teams);
});

teamsApis.post("/", async (c) => {
  var team = await c.req.json<ITeams>();
  customLogger("Request Body : ", JSON.stringify(team));
  var teamDocument = new Teams(team);
  try {
    await teamDocument.save();
    return c.json({
      status: "Success",
    });
  } catch (error) {
    c.status(503);
    return c.json({
      status: "Failure",
    });
  }
});

teamsApis.get("/:teamId", async (c) => {
  var teamId = c.req.param("teamId");
  customLogger(`Fetching team: ${teamId}`);
  try {
    const team = await Teams.findById(teamId);
    return c.json(team);
  } catch (error) {
    c.status(503);
    return c.json({
      status: "Failure",
    });
  }
});

teamsApis.put("/:teamId", async (c) => {
  var teamId = c.req.param("teamId");
  var team = await c.req.json<ITeams>();
  customLogger(`Updating Body of ${teamId} to : `, JSON.stringify(team));
  try {
    await Teams.findByIdAndUpdate(teamId, team);
    return c.json({
      status: "Success",
    });
  } catch (error) {
    c.status(503);
    return c.json({
      status: "Failure",
    });
  }
});
teamsApis.delete("/:teamId", async (c) => {
  var teamId = c.req.param("teamId");
  customLogger(`Deleting team: ${teamId}`);
  try {
    await Teams.findByIdAndDelete(teamId);
    return c.json({
      status: "Success",
    });
  } catch (error) {
    c.status(503);
    return c.json({
      status: "Failure",
    });
  }
});
teamsApis.delete("/", async (c) => {
  var isAll = c.req.query("isAll");
  customLogger("Nuking all the teams");
  try {
    if (isAll?.toLowerCase() === "true") {
      await Teams.deleteMany({});
      return c.json({
        status: "Success",
      });
    }
  } catch (error) {
    c.status(503);
    return c.json({
      status: "Failure",
    });
  }
});

teamsApis.get("/addTeams/", async (c) =>{
  return c.json(await loadTeams(Teams))
})

export default teamsApis;
