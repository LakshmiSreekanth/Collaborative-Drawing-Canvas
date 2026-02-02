#  Real-Time Collaborative Drawing Canvas

A multi-user drawing application where multiple people can draw simultaneously on a shared canvas with real-time synchronization.

##  Features

- **Real-time drawing** - See others draw instantly
- **Multiple users** - Unlimited simultaneous users
- **Drawing tools** - Brush and eraser with adjustable sizes
- **Color palette** - 8 preset colors
- **Global undo/redo** - Works across all users
- **Save drawings** - Download as PNG images
- **Username system** - Personal identification
- **Responsive design** - Works on desktop and mobile

##  Quick Start
npm install    # Install packages
npm start      # Start server
node server.js # Start server (alternative)

### Prerequisites
- Node.js v18 or higher
- HTML,CSS,Javascript

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/collab-canvas.git
cd collab-canvas

npm install    # Install packages
npm start      # Start server
node server.js # Start server (alternative)


collab-canvas/
├── server.js              # Backend server with WebSocket logic
├── package.json          # Dependencies and scripts
├── README.md            # This file
└── public/
    └── index.html       # Frontend with HTML, CSS, and JavaScript
