const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set up static files and view engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for location data from client
    socket.on('send-location', function(data) {
        io.emit("recieve-location" , {id: socket.id , ...data});
    });

    socket.on('disconnect', () => {
        io.emit("user-disconnected" , socket.id )
    });
});

// Route to render the index.ejs file
app.get('/', (req, res) => {
    res.render('index');
});

// Start server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
