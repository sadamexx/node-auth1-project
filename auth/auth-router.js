const express = require('express');
const bcrypt = require('bcryptjs');
const users = require('../users/users-model.js');


const router = express.Router();

router.post('/register', (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    console.log(user)
    users.add(user)
        .then(saved =>{
            // req.session.loggedIn = true; //keeps them logged in after reg
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) =>{
    let { username, password } = req.body;
   

    users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                req.session.loggedIn = true;                
                req.session.username = user.username;

                res.status(200).json({message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: "Invalid Credentials"});
            }
        })
        .catch(error => {
            res.status (500).json(error);
        });
});

router.get('/logout', (req,res) => {
    if(req.session){
    req.session.destroy(error => {
      if(err){
        res.status(500).json({ message: "You are still logged in man, sowwy!"});
      } else { 
        res.status(200).json({message: "You successfully logged out!"});     
      }
    });
  } else {
    res.status(200).json({message: "You successfully logged out!"});
  }
});

module.exports = router;