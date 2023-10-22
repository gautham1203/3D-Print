const express = require('express');
require('dotenv').config();
const path = require('path'); // Add this line
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const axios = require('axios');


// Serve static files from a "public" directory
app.use(express.static(path.join(__dirname, 'public'))); // Add this line

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Modify this line
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('recognizedText', (data) => {
        console.log(`Received recognized text: ${data}`);
        // Further processing here
    });
});

http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
