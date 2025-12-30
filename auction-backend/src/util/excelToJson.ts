import readXlsxFile from "read-excel-file";
import data from './output.json' with { type: 'json' }
import type { Model } from "mongoose";
import type { IPlayer } from "../database/playerSchema.js";

export async function loadPlayerToDatabase(Players:Model<IPlayer>){
    //  Players.insertOne(data[0])
    // data.forEach((row)=>{
    //     console.log(row)
    //     Players.insertOne(row)
    // })
    return Players.insertMany(data)
    
}

