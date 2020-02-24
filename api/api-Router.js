
const express = require('express');
const usersRouter = require('../users/users-Router.js');
const authRouter = require('../auth/auth-router.js');
const restricted = require('./restricted-middleware.js');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', restricted, usersRouter);


router.get("/", (req, res) => {
    res.json({ api: "You are on the api route"});
});

module.exports = router;
