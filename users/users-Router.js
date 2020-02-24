
const express = require('express');
const users = require('./users-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    users.find('users')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: "Error retrieving data"});
        });
});

module.exports = router;