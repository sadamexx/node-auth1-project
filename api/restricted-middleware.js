const bcrypt = require('bcryptjs');
const users = require('../users/users-model.js');

module.exports = (req, res, next) => {
    const { username, password } = req.headers;

    if(username && password){
        users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                next();
            } else {
                res.status(401).json({ message: "Invalid Credentials"});
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: "Error while processing data"});
        });
    } else {
        res.status(400).json({ message: "Please provide necessary credentials"});
    }
};
