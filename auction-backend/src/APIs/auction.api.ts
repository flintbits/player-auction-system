import { Hono } from "hono";
import { customLogger } from "../custom_logger.js";
import { Players } from "../database/playerSchema.js";
import { Teams } from "../database/teamsSchema.js";
import { Status } from "../database/statusSchema.js";

const auctionApis = new Hono();

auctionApis.post("/markUnsold/:playerId", async (c) => {
  let playerId = c.req.param("playerId");

  customLogger(`Updating player: ${playerId}`, JSON.stringify(playerId));
  const updateBody = {
    markUnsold: true,
  };
  try {
    await Players.findByIdAndUpdate(playerId, updateBody);
    return c.json({
      status: "success",
    });
  } catch (error) {
    return c.json({
      status: "failure",
    });
  }
});

auctionApis.get("/randomPlayers/:category", async (c) => {
  let category = c.req.param("category");

  customLogger(`Getting Random Player`);

  try {
    var players = await Players.aggregate([
      {
        $match: {
          markUnsold: false,
          category: category,
          team: { $exists: false },
        },
      },
      { $sample: { size: 1 } },
    ]);
    return c.json(players);
  } catch (error) {
    return c.json({
      status: "failure",
    });
  }
});

auctionApis.post("/soldPlayer", async (c) => {
  let details = await c.req.json();

  try {
    const team = await Teams.findById(details.teamId);
    const player = await Players.findById(details.playerId);
    if (player && team) {
      player.team = team.name;
      player.price = details.price;
      player.save();

      team.players = team.players.concat(player);
      team.purseValue = team.purseValue - details.price;
      team.save();

            customLogger(`Sold ${player.name} to ${team.name} for ${details.price}`);
    }
    return c.json(player);
  } catch (error) {
    return c.json({
      status: "failure",
    });
  }
});

auctionApis.put("/endRound/:category", async(c) =>{
    let category = c.req.param("category");
    
    customLogger(`Ending round for ${category}`);

    try {
        await Players.updateMany({markUnsold:true, category: category},{markUnsold:false})
        return c.json({
            status: "success",
        });
        
    } catch (error) {
        return c.json({
            status: "failure",
        });
    }
    
})

auctionApis.get("/status", async (c)=>{
    try {
        const status = await Status.find()
        return c.json(status[0]);
        
    } catch (error) {
        return c.json({
            status: "failure",
        });
    }
})

auctionApis.put("/status/updateCategory/:category", async (c)=>{
    let category = c.req.param("category");
    
    customLogger(`Updating round for ${category}`);
    try {
        const status = await Status.find()
        if(status.length){
            status[0].category = category
            status[0].save()
        }
        else{
            var newStatus = new Status()
            newStatus.category = category
            newStatus.save()
        }
        return c.json({
            status: "success",
        });
        
    } catch (error) {
        return c.json({
            status: "failure",
        });
    }
})
auctionApis.put("/status/updatePlayer/:playerId", async (c)=>{
    let playerId = c.req.param("playerId");
    
    customLogger(`Updating status with player ${playerId}`);
    try {
        const status = await Status.find()
        var player = await Players.findById(playerId)
        if(status.length){
            if(player){
                status[0].player = player
                status[0].save()
            }
        }
        else{
            var newStatus = new Status()
            if(player){
                newStatus.player = player
                newStatus.save()
            }
        }
        return c.json({
            status: "success",
        });
        
    } catch (error) {
        return c.json({
            status: "failure",
        });
    }
})
export default auctionApis

