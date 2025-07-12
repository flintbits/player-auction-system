import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { PlayerSchema, type IPlayer } from "./playerSchema.js";

export interface IStatus {
    category: string;
    player:IPlayer
}

const StatusSchema  = new Schema({
    _id: { type: String, default: uuidv4 },
    category: { type: String, require: true, default: "Ladies" },
    player:{type:PlayerSchema, require:false}
});

const Status = model<IStatus>("Status", StatusSchema);

export { Status, StatusSchema };
