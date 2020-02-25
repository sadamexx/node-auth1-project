const express = require('express');
const apiRouter = require('./api/api-Router.js');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session); 
const knex = require('./data/dbConfig.js'); 

const usersRouter = require('./users/users-Router');
const authRouter = require('./auth/auth-router.js');
const restricted = require('./api/restricted-middleware');

const server = express();
server.use(express.json());

const sessionConfig = {
    name: 'cookieMonster',
    secret: 'chocolateChip', ///this should be an environment variable, meaning in dev it will be this, in production it will be a variable
    resave: false,
    saveUninitialized: true, //related to GDPR compliance... meaning we HAVE to tell them we are using cookies
    cookie: {
        maxAge: 1000 * 60 * 10, /// 1000 miliseconds is ten seconds, times 60 is one minute times 10 is ten minutes
        secure: false, //should be TRUE in production (https)
        httpOnly: true, //unless a SUPER good reason to be false, where JS can touch it
    }, 
    // #10 remember the NEW keyword below
    store: new KnexStore({
        knex,
        tablename: 'sessions',
        createtable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 15, 
    })
};


server.use(session(sessionConfig));
// server.use('/api', apiRouter)
server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);

server.get('/', (req, res) => {
    console.log(req.session)
    res.send('Time to authorize baby!');
});

module.exports = server;


