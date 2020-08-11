const express = require('express');
const router = express.Router();
const {mongoose} = require('../db/mongoose');
const User = require('../models/user');

router.get('/', (req, res) => {
    res.send('Hello from Api route');
});

// router.post('/register', (req, res) => {
    // let userData = req.body;
    // let user = new User(userData);
    
    // user.save((error, registeredUser) => {
        // if(error){
           // return console.log('error saving user');
        // }
        // res.status(200).send(registeredUser);
    // });
// });
router.post('/login', (req, res) => {
    let loginData = req.body;
    
    User.findOne({username: loginData.username}, (error, user) => {
        if(error){
            console.log(error);
        }else{
            if(!user){
                res.status(401).send('Invalid username or password');
            }else{
                if(user.password !== loginData.password){
                    res.status(401).send('Invalid password');
                }else{
                    res.status(200).send(user);
                }
            }
        }
    });
});


module.exports = router;