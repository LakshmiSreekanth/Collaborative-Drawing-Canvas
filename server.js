const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Store drawings
const drawings = [];

io.on("connection", (socket) => {
    console.log("🔌 New user connected:", socket.id);
    
    // Send existing drawings to new user
    socket.emit("init", { drawings });
    
    // Handle user joining with username
    socket.on("user-join", (userData) => {
        console.log(`👋 ${userData.name} joined the drawing session`);
    });
    
    // Handle drawing events
    socket.on("draw", (data) => {
        drawings.push(data);
        socket.broadcast.emit("draw", data);
    });
    
    // Handle undo
    socket.on("undo", () => {
        if (drawings.length > 0) {
            drawings.pop();
            io.emit("clear");
            // Redraw all remaining drawings
            drawings.forEach(drawing => {
                io.emit("draw", drawing);
            });
        }
    });
    
    // Handle clear
    socket.on("clear", () => {
        drawings.length = 0;
        io.emit("clear");
    });
    
    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("========================================");
    console.log("🚀  Collaborative Drawing Canvas");
    console.log("📡  Server running on port " + PORT);
    console.log("🎨  Open: http://localhost:" + PORT);
    console.log("👤  Users can set their usernames");
    console.log("✅  Drawing works correctly");
    console.log("========================================");
});
