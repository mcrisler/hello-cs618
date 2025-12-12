//backend/src/index.js
import dotenv from "dotenv";
dotenv.config();
import { initDatabase } from "./db/init.js";
import http from "http";
import { Server } from "socket.io";
import { app } from "./app.js";
import { setupSocketIO } from "./socket.js";

const PORT = process.env.PORT;
await initDatabase();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
setupSocketIO(io);
server.listen(PORT, () => {
  console.info(`express server running on http://localhost:${PORT}`);
  console.info(`socket.io running on http://localhost:${PORT}`);
});
