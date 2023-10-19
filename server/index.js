import express from 'express'
const app = express()
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'


app.use(cors());

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
      origin:"http://localhost:3000",
      method:['GET','POST'],  
    }
});

io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data)=>{
        socket.join(data)
        console.log(`User with ID : ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message",(data)=>{
        console.log(data);
        socket.to(data.room).emit("recieve_message",data)
    })
    socket.on("disconnected",()=>{
        console.log("User Disconnected",socket.id);
    });
});


server.listen(3001,()=>{
    console.log('Server started');
})

console.log("hallo");