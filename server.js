const express = require('express');
const apiRouter = require('./api/api-Router.js');

const server = express();
server.use(express.json());

server.use('/api', apiRouter)

server.get('/', (req, res) => {
    res.send('Time to authorize baby!');
});

module.exports = server;


