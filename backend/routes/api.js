const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {mongoose} = require('../db/mongoose');
const objectID = require('mongoose').Types.ObjectId;
const fs = require('fs');
const path = require('path');
const multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');

//let gfs = mongoose.connection.db;
const User = require('../models/user');
const Post = require('../models/post');

function verifyToken(req, res, next){
    if(!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send("Unauthorized request");
    }
    
    // if(!payload){
        // return res.status(401).send("Unauthorized request");
    // }
    try{
        let payload = jwt.verify(token, 'secretKey');
        req.userId = payload.subject;
        next();
    }
    catch(err){
        return res.status(401).send("Unauthorized request");
    }
   
    //console.log(req.userId);
  
}
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../src/assets/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
let upload = multer({ storage: storage }).single('img');


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
        // let payload = { subject: userData._id };
        // let token = jwt.sign(payload, 'secretKey');
        // res.status(200).send(token);
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
                    let payload = { subject: loginData._id };
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token});
                }
            }
        }
    });
});

router.get("/dashboard", verifyToken, (req, res) => {
    //res.send('working');
    Post.find((err, doc) => {
        if(err){
            return console.log('error retrieving posts');
        }
        res.send(doc);
    })
});

router.post("/dashboard/add", upload, (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    let mydate = new Date();
    
    let obj = new Post({
        title: req.body.title,
        type: req.body.type,
        img: {
            data: fs.readFileSync('../src/assets/uploads/' + req.file.originalname),
            contentType: 'image/png'
        },
        name: req.file.originalname,
        path: req.file.path,
        date: mydate,
        url: req.body.url
    });
    obj.save((err, item) => {
        if(err){
            console.log(err);
        }
        res.send(item);
        console.log(item)
    });
});

router.get("/dashboard/dashview", (req, res) => {
    Post.find((err, doc) => {
       if(err){
           return res.send(err + "Error retrieving posts");
       } 
       res.send(doc);
       console.log(doc);
    });

        
});

router.get('/dashboard/dashview/:id', (req, res) => {
    if(!objectID.isValid(req.params.id)){
        return res.status(400).send(err + "no post with given id");
    }
    Post.findById(req.params.id, (err, doc) => {
        if(err){
           return res.send(err + "Error retrieving post");
       } 
       res.send(doc);
    });
});

router.put('/dashboard/dashview/:id', upload, (req, res) => {
    let mydate = new Date();
     if(!objectID.isValid(req.params.id)){
        return res.status(400).send(err + `no post with given id ${req.params.id}`);
    }
   let postUpdate = {
         title: req.body.title,
         type: req.body.type,
         img: {
            data: fs.readFileSync('../src/assets/uploads/' + req.file.originalname),
            contentType: 'image/png'
         },
          name: req.file.originalname,
          path: req.file.path,
          date: mydate,
          url: req.body.url
   };
   Post.findByIdAndUpdate(req.params.id, {$set: postUpdate}, {new: true}, (err, doc) => {
       if(err){
           return res.send(`error updating post wuth id ${req.params.id}`);
           }
           res.send(doc);
   });
});

router.delete('/dashboard/dashview/:id',upload, (req, res) => {
    if(!objectID.isValid(req.params.id)){
        return res.status(400).send(err + `no post with given id ${req.params.id}`);
    }
    Post.findByIdAndRemove(req.params.id, (err, doc) => {
        // let path = req.file.path;
        // fs.unlink(path + req.file.filename);
         if(err){
           return res.send(`error deleting post wuth id ${req.params.id}`);
           }
           let path = doc.path;
           fs.unlink(path, (err) => {
               console.log(err);
           });
           res.send(doc);
    });
});


module.exports = router;