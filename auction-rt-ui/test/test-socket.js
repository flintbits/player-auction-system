import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  path: "/socket", // MUST MATCH SERVER
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("CONNECTED:", socket.id);
});

socket.on("updateBid", () => {
  console.log("updateBid received");
});

socket.on("connect_error", (err) => {
  console.error("CONNECT ERROR:", err.message);
});
