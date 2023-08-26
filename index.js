const express= require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} =require("socket.io");
const dotenv = require('dotenv');
app.use(cors());
dotenv.config();

const server=http.createServer(app);

const io =new Server(server,{
    cors:{ 
        origin:"*",
        methods:["GET","POST"]
    }
});
io.on("connection",(socket)=>{
    console.log(socket.id);

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`user with id ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
    })
});

server.listen(process.env.PORT,()=>{
    console.log("server running");
})