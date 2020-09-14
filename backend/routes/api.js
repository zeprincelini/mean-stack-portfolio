const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {mongoose} = require('../db/mongoose');
const objectID = require('mongoose').Types.ObjectId;
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
//const mailgun = require('mailgun-js')({process.env.MAILGUN_DOMAIN, process.env.MAILGUN_API});
require("dotenv").config()

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

// let storage = multer.diskStorage({
    // destination: (req, file, cb) => {
        // //cb(null, '../src/assets/uploads/')
         // cb(null, path.join(__dirname, '/assets/uploads'))
        
    // },
    // filename: (req, file, cb) => {
        // cb(null, file.originalname)
    // }
// });
// let upload = multer({ storage: storage }).single('img');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
 });
    const storage = new cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "portfolio-asset",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
  });
    const parser = multer({ storage: storage });


router.get('/', (req, res) => {
    res.send('Hello from Api route');
});

router.post('/register', (req, res) => {
    
    bcrypt.hash(req.body.password, 10).then((hash) => {
        let userData = req.body;
        let user = new User({
            username: req.body.username,
            password: hash
        });
        user.save((error, registeredUser) => {
        if(error){
           return console.log('error saving user');
        }
        let payload = { subject: userData._id };
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send(token);
        console.log(registeredUser);
    });
    });
    
    //let userData = req.body;
    // let user = new User(userData);
    
});
router.post('/login', (req, res) => {
    let loginData = req.body;
    
    User.findOne({username: loginData.username}, (error, user) => {
        if(error){
            console.log(error);
        }else{
            if(!user){
                return res.status(401).send('Invalid username or password');
            }
                bcrypt.compare(req.body.password, user.password).then((valid) => {
                   if(!valid){
                       return res.status(401).json({
                           error : new Error("Incorrect password")
                       });
                   }
                    let payload = { subject: loginData._id };
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token});                   
                }).catch((err) => {
                   res.status(500).json({
                       error: error
                   }) 
                });   
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

router.post("/dashboard/add", parser.single('img'), (req, res) => {
    // console.log(req.body);
    console.log(req.file);
    let mydate = new Date();
    
    let obj = new Post({
        title: req.body.title,
        type: req.body.type,
        // img: {
            // //data: fs.readFileSync('../src/assets/uploads/' + req.file.originalname),
            // data: fs.readFileSync(path.resolve(__dirname, 'assets/uploads/') + req.file.originalname),
            // contentType: 'image/png'
        // },
        //name: req.file.originalname,
        //path: req.file.path,
        date: mydate,
        url: req.file.url
    });
    obj.save((err, item) => {
        if(err){
            res.status(401).send(err);
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
            data: fs.readFileSync(path.resolve(__dirname, 'assets/uploads/') + req.file.originalname),
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

router.post('/contact/send', (req, res) => {
        let transporter = nodemailer.createTransport({
       host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });
    
    let mailOptions = {
        from: process.env.user,
        to: 'princelini4@gmail.com',
        subject: req.body.email + ' Developer Job',
        text: "Name: "+ req.body.name + " Job Request: " + req.body.job
    }
    
    transporter.sendMail(mailOptions, (err, data) => {
       if(err){
           console.log('Error, try again', err);
           res.status(500).send('Error, try again ' + err);
       }else{
           res.status(200).send('Email sent successfully');
           console.log(data);
       }
    });
});


module.exports = router;