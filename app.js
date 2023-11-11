require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const { messages } = require('./models');

const app = express();
const PORT = process.env.PORT || 3003;

let chatRoom = "";
let users = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`Client socket id: ${socket.id}`);

  socket.on("join", (data) => {
    const { name, room } = data;
    socket.join(room);

    let createdAt = Date.now();

    socket.to(room).emit("receive", { // untuk user lain
      message: `${name} just entered the room.`,
      name: "Host",
      createdAt,
    });

    socket.emit("receive", { // untuk user baru
      message: `Welcome ${name}.`,
      name: "Host",
      createdAt,
    });

    chatRoom = room;

    users.push({ id: socket.id, name, room });

    messages.findAll({
      where: {
        room: room
      },
      limit: 50
    })
      .then((messages) => {
        messages = messages.map((message) => message.dataValues).map((msg) => {
          return {
            message: msg.message,
            name: msg.name,
            createdAt: msg.createdAt,
          };
        });
        socket.emit("old_messages", messages);
      })
      .catch((error) => {
        console.log("Find message by room: ", error);
      });
  });

  socket.on("refresh", (data) => {
    const { room } = data;
    console.log('di refresh :', room);
    socket.join(room);

    messages.findAll({
      where: {
        room: room
      },
      limit: 50
    })
      .then((messages) => {
        messages = messages.map((message) => message.dataValues).map((msg) => {
          return {
            message: msg.message,
            name: msg.name,
            createdAt: msg.createdAt,
          };
        });
        socket.emit("old_messages", messages);
      })
      .catch((error) => {
        console.log("Find message by room: ", error);
      });
  });

  socket.on("send", (data) => {
    const { name, room, message } = data;
    io.in(room).emit("receive", data);

    messages.create({
      message, name, room
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  socket.on('disconnect', () => {
    const user = users.find((user) => user.id == socket.id);
    if (user?.name) {
      let createdAt = Date.now();

      socket.to(chatRoom).emit("receive", {
        message: `${user.name} has left the chat.`,
        name: "Host",
        createdAt,
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`App is running at localhost:${PORT}`);
});
