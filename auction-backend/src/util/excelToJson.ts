import readXlsxFile from "read-excel-file";
import players from './players.json' with { type: 'json' }
import teams from './teams.json' with { type: 'json' }
import type { Model } from "mongoose";
import type { IPlayer } from "../database/playerSchema.js";
import type { ITeams } from "../database/teamsSchema.js";

export async function loadPlayerToDatabase(Players:Model<IPlayer>){
    return Players.insertMany(players)
}

export async function loadTeams(Teams:Model<ITeams>) {
    return Teams.insertMany(teams)
}

