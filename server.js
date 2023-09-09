// const { WebSocketServer } = require("ws");

// const wss = new WebSocketServer({ port: 8080 });

// const clients = [];

// wss.on("connection", (socket) => {
//   console.log("Client connected");
//   clients.push(socket);

//   for (const client of clients) {
//     if (client === socket) {
//       client.send("Welcome to chat");
//     } else {
//       client.send("New user connected to Chat");
//     }
//   }
//  //intersept messages on the server side
//   socket.on("message", (message) => {

//     const data = JSON.parse(message.toString("utf-8"));
//     for (const client of clients) {
//       if (client === socket) {
//         client.send(`You: ${data.message}`);
//       } else {
//         client.send(`${data.name}: ${data.message}`);
//       }
//     }
//   });
// });

// console.log("server running on port 8080");

// node server.js
/////////////////////////////////////

//or

// const http = require("node:http");
// const { connect } = require("node:tls");
// const { Server } = require("socket.io");

// const server = http.createServer();
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {
//   socket.emit("chatMessage", "Welcome to Chat");
//   socket.broadcast.emit("chatMessage", "New user connected in Chat");

//   socket.on("chatMessage", (message) => {
//     const data = JSON.parse(message);

//     socket.emit("chatMessage", `You: ${data.message}`);
//     socket.broadcast.emit("chatMessage", ` ${data.name}: ${data.message}`);
//   });
// });

// server.listen(8080, () => {
//   console.log("Server is runnig on port: 8080");
// });

// // node server.js

// /////////////////////////////////

//or

const http = require("node:http");

const express = require("express");

const { connect } = require("node:tls");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
});
app.get("/ping", (req, res) => {
  res.send("pong");
});

io.on("connection", (socket) => {
  socket.emit("chatMessage", "Welcome to Chat");
  socket.broadcast.emit("chatMessage", "New user connected in Chat");

  socket.on("chatMessage", (message) => {
    const data = JSON.parse(message);

    socket.emit("chatMessage", `You: ${data.message}`);
    socket.broadcast.emit("chatMessage", ` ${data.name}: ${data.message}`);
  });
});

server.listen(8080, () => {
  console.log("Server is runnig on port: 8080");
});

// node server.js
