const express = require('express');
const cors = require('cors');
const db = require('../database/connection')
// const helmet = require('helmet');

const server = express();
const authRouter = require('./auth/authRouter')
const todoRouter = require('./todo/todoRouter');

// server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/todos', todoRouter)

server.get('/', (req, res) => {
    res.json({
        api: "up",
        availability: "closed"
    })
});

module.exports = server;