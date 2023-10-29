import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import { initDB } from "./db";
import router from "./login/route";
import { router as vacationsRouter } from "./vacations/route";
import { Server } from "socket.io";
initDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/healthcheck", async (req, res) => {
  return res.send("Api is working!!");
});

app.use("/login", router);
app.use("/vacations", vacationsRouter);

app.use((error, req, res, next) => {
  // console.log(error);
  return res.status(500).json({ message: "something went wrong" });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Listening to Port: ${PORT}`);
});

const io = new Server(4300, {
  cors: {
    origin: "*",
  },
});

const usersMapping = {};

// Connecting - when client connects to the server
io.on("connection", (socket) => {
  console.log("New connection opened with the Server: ", socket.id);

  socket.on("client-login", (userName) => {
    // sending message to ALL Clients
    usersMapping[socket.id] = userName;
    socket.broadcast.emit("new-user-logged-in", `User: ${userName} has joined`);
  });

  // Listen to a specific message
  socket.on("client-send-message", (message) => {
    // sending message to ALL Clients
    const user = usersMapping[socket.id] || socket.id;
    io.emit("message-from-server", `${user}: ${message}`);
  });
});
