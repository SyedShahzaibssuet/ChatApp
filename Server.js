const express = require('express');
const app = express();
const port = process.env.port || 3000;
const http =require('http').createServer(app);

app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/node_modules'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})



http.listen(port,()=>{
    console.log(`Listening On Port ${port}`);
})

const io = require('socket.io')(http);
io.on('connection',(socket)=>{
    console.log("Connected....");
    socket.on("Message",(message)=>{
        socket.broadcast.emit('Message',message)
    })
})