const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const charactersRouter = require("../characters/characters-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.use("/api/characters", charactersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;