import type { IPlayer } from "../database/playerSchema.js";
import type { ITeams } from "../database/teamsSchema.js";

export interface ServerToClientEvents {
    updatePlayer: () => void;
    updateBid: () => void;
}

export interface ClientToServerEvents {
    nextPlayer: (player: IPlayer) => void;
    bidPlayer: (price: number, team: ITeams) => void;
}
