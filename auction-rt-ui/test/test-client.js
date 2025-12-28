import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  path: "/socket", // MUST MATCH SERVER
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("CONNECTED:", socket.id);
  socket.emit('onConnection')
});

socket.on("onConnection",(currentPlayer, bidPrice, team)=>{
  console.log(`Current player : ${currentPlayer}`)
  console.log(`Current bidprice : ${bidPrice}`)
  console.log(`Current team : ${team}`)
})

socket.on("updateBid", (bidAmount, team) => {
  console.log(`updateBid received : ${bidAmount} from team ${team}`);
});

socket.on("updatePlayer", (player) => {
  console.log(`update player received : ${player}`);
});

socket.on("bidCompleted", (price, team) => {
  console.log(`Bid completed Player has been sold to ${team} for ${price}`);
});

socket.on("connect_error", (err) => {
  console.error("CONNECT ERROR:", err.message);
});
