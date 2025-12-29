import type { Server, Socket } from "socket.io";
import type { IPlayer } from "../database/playerSchema.js";
import type { ITeams } from "../database/teamsSchema.js";
import type { ClientToServerEvents, ServerToClientEvents } from "./socket.js";

let currentPlayer:IPlayer | undefined = undefined
let bidPrice:number = 0
let teams:ITeams | undefined = undefined

function registerEvents(
    io: Server<ClientToServerEvents, ServerToClientEvents>,
    socket: Socket
) {
    function nextPlayer(player: IPlayer) {
        currentPlayer = player
        socket.broadcast.emit("updatePlayer", player);
    }

    function bidPlayer(price: number, team: ITeams) {
        bidPrice = price
        teams = team
        socket.broadcast.emit("updateBid", price, team);
    }

    function endBid(price:number, team:string){
        socket.broadcast.emit("bidCompleted", price, team)
    }

    function onConnection(){
        // socket.emit("onConnection", currentPlayer, bidPrice, teams)
        socket.emit("updatePlayer",currentPlayer)
        socket.emit("updateBid", bidPrice, teams)
    }

    socket.on("nextPlayer", nextPlayer);
    socket.on("bidPlayer", bidPlayer);
    socket.on("endBid", endBid)
    socket.on("onConnection", onConnection)
}

export { registerEvents };
