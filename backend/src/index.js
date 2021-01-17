require('dotenv').config();
const cookieParser = require('cookie-parser');
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  },
}, server => console.log(`my server is running on port ${server.port}`))
