import { model, Model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IPlayer {
    name: string;
    age: number;
    houseName: string;
    location: string;
    email: string;
    contact: number;
    gender: string;
    photo:string,
    expertice: number;
    basePrice: number;
    dob: string;
    hand: string;
    price: number;
    team: string;
    category: string[];
    referanceNumber: number;
    markUnsold: boolean;
}

const PlayerSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, require: true },
    age: { type: Number, require: true },
    houseName: { type: String, require: false },
    location: { type: String, require: false },
    email: { type: String, require: false },
    contact: { type: Number, require: true, default: 1 },
    gender: { type: String, require: true },
    photo: { type: String, require: false },
    expertice: { type: Number, require: true, default: 1 },
    basePrice: { type: Number, require: true, default: 200 },
    dob: { type: String, require: true, default: "1-1-2000" },
    hand: { type: String, require: true, default: "right" },
    price: { type: Number, require: false, default: 0 },
    team: { type: String, require: true },
    category: { type: [String], require: true, default: ["General"] },
    referanceNumber: { type: Number, require: true, default: 0 },
    markUnsold: { type: Boolean, require: true, default: false },
});

const Players = model<IPlayer>("Players", PlayerSchema);

export { Players, PlayerSchema };
