require('dotenv').config();
const cookieParser = require('cookie-parser');
const createServer = require('./createServer');
const db = require('./db');
const jwt = require('jsonwebtoken');
const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const {token} = req.cookies;
  if (token) {
    const {userId} = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
})

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, server => console.log(`my server is running on port ${server.port}`))
