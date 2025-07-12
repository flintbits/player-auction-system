import { model, Schema } from "mongoose";
import { PlayerSchema, type IPlayer } from "./playerSchema.js";
import { v4 as uuidv4 } from 'uuid';

export interface ITeams {
    name: string
    logo: string
    owner: string
    purseValue: number
    players: IPlayer[]
}

const TeamsSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    name: { type:String, require: true},
    logo: { type:String, require: true},
    owner: { type:String, require: true},
    purseValue: { type:Number, require: true, default: 50000},
    players: { type:[PlayerSchema], require: false, default: []}
})

const Teams = model<ITeams>('Teams', TeamsSchema)

export { TeamsSchema, Teams }