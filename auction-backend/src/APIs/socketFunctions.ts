import type { Server, Socket } from "socket.io";
import type { IPlayer } from "../database/playerSchema.js";
import type { ITeams } from "../database/teamsSchema.js";
import type { ClientToServerEvents, ServerToClientEvents } from "./socket.js";

function registerEvents(
    io: Server<ClientToServerEvents, ServerToClientEvents>,
    socket: Socket
) {
    function nextPlayer(player: IPlayer) {
        socket.broadcast.emit("updatePlayer", player);
    }

    function bidPlayer(price: number, team: ITeams) {
        socket.broadcast.emit("updateBid", price, team);
    }

    socket.on("nextPlayer", nextPlayer);
    socket.on("bidPlayer", bidPlayer);
}

export { registerEvents };
