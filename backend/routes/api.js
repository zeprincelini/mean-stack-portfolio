const express = require("express");
const router = express.Router();
const objectID = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary").v2;

const User = require("../models/user");
const Post = require("../models/post");
const upload = require("../helper/multer-cloudinary");
const verifyToken = require("../helper/verifyToken");

router.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    let user = new User({
      username: req.body.username,
      password: hash,
    });
    user.save((error, registeredUser) => {
      if (error) {
        return res.status(401).json({ error: "failed to signup" });
      }
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, process.env.JWT_SECRET);
      res.status(200).send(token);
    });
  });
});
router.post("/login", (req, res) => {
  let loginData = req.body;

  User.findOne({ username: loginData.username }, (error, user) => {
    if (error) {
      return res.status(403).json({ error });
    } else {
      if (!user) {
        return res.status(401).send("Invalid username or password");
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password"),
            });
          }
          let payload = { subject: user._id };
          let token = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200).send({ token });
        })
        .catch((err) => {
          res.status(500).json({
            error: err.message,
          });
        });
    }
  });
});

router.get("/dashboard", verifyToken, (req, res) => {
  Post.find((err, doc) => {
    if (err) {
      return res.status(401).json({ error: "failed to retrieve posts" });
    }
    res.send(doc);
  });
});

router.post("/dashboard/add", upload, async (req, res) => {
  try {
    const mydate = new Date();
    const obj = new Post({
      title: req.body.title,
      type: req.body.type,
      date: mydate,
      url: req.body.url,
      imageUrl: req.file.path,
      imageId: req.file.filename,
    });
    await obj.save();
    res.status("200").json({
      status: "success",
      message: "Post created Successfully",
    });
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }
});

router.get("/dashboard/dashview", (req, res) => {
  Post.find((err, doc) => {
    if (err) {
      return res.send(err + "Error retrieving posts");
    }
    res.send(doc);
    console.log(doc);
  });
});

router.get("/dashboard/dashview/:id", (req, res) => {
  if (!objectID.isValid(req.params.id)) {
    return res.status(400).send(err + "no post with given id");
  }
  Post.findById(req.params.id, (err, doc) => {
    if (err) {
      return res.send(err + "Error retrieving post");
    }
    res.send(doc);
  });
});

router.put("/dashboard/dashview/:id", upload, async (req, res) => {
  const mydate = new Date();
  if (!objectID.isValid(req.params.id)) {
    return res.status(400).send(err + `no post with given id ${req.params.id}`);
  }
  try {
    const updatedPost = {
      title: req.body.title,
      type: req.body.type,
      date: mydate,
      url: req.body.url,
      imageUrl: req.file.path,
      imageId: req.file.filename,
    };
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedPost,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ status: "success", message: "post updated successfully" });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
});

router.delete("/dashboard/dashview/:id", (req, res) => {
  if (!objectID.isValid(req.params.id)) {
    return res.status(400).send(err + `no post with given id ${req.params.id}`);
  }
  Post.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) {
      return res.send(`error deleting post wuth id ${req.params.id}`);
    }

    cloudinary.uploader.destroy(doc.imageId, (error, result) => {
      console.log(result, error);
    });
    res.send(doc);
  });
});

router.post("/contact/send", (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  let mailOptions = {
    from: process.env.user,
    to: "princelini4@gmail.com",
    subject: req.body.email + " Developer Job",
    text: "Name: " + req.body.name + " Job Request: " + req.body.job,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error, try again", err);
      res.status(500).send("Error, try again " + err);
    } else {
      res.status(200).send("Email sent successfully");
      console.log(data);
    }
  });
});

module.exports = router;
