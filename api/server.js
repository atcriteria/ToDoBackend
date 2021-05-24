require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const db = require('../database/connection')
// const helmet = require('helmet');

const server = express();
const authRouter = require('./auth/authRouter')

// server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({
        api: "up",
        availability: "closed"
    })
});

server.listen(PORT, () => {
    console.log(`\n *** Server listening on localhost:${PORT}! ***\n`)
});
