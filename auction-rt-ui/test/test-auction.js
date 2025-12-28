import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  path: "/socket", // MUST MATCH SERVER
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("CONNECTED:", socket.id);
  socket.emit("nextPlayer", "Skipper")
});

socket.on("connect_error", (err) => {
  console.error("CONNECT ERROR:", err.message);
});

let bidAmount = 100

let testInterval = () => {
  socket.emit("bidPlayer",  bidAmount, `Team ${(bidAmount / 100) % 3}` )
  bidAmount += 100
}

const intervalId = setInterval(testInterval, 1000);

setTimeout(() => {
  clearInterval(intervalId); // Uses the ID returned by setInterval
  console.log('Bid stopped');
  socket.emit("endBid", bidAmount, "Team A" )
}, 20000);
