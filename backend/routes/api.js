const express = require("express");
const router = express.Router();
const objectID = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Post = require("../models/post");
const upload = require("../helper/multer-cloudinary");
const verifyToken = require("../helper/verifyToken");

router.post("/register", (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
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
        res.status(200).json({ token });
      });
    })
    .catch((e) => {
      return res.status(401).json({ error: e.message });
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
          res.status(200).json({ token });
        })
        .catch((err) => {
          res.status(500).json({
            error: err.message,
          });
        });
    }
  });
});

router.get("/dashboard", async (req, res) => {
  let filter = {};
  if (req.query.type) {
    if (req.query.type !== "" && req.query.type.length > 0) {
      filter.type = req.query.type;
    }
  }
  try {
    const docs = await Post.find(filter).sort({ createdAt: -1 }).lean();

    return res.status(200).json(docs);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
});

router.get("/dashview", verifyToken, async (req, res) => {
  const { page = 0, limit = 10 } = req.query;
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(page * limit); // (page - 1) * limit but matpaginator starts at index 0
    const totalCount = await Post.count();
    return res.status(200).json({ posts, totalCount });
  } catch (err) {
    return res.status(401).json({ error: "failed to retrieve posts" });
  }
});

router.post("/dashboard/add", upload, async (req, res) => {
  try {
    const obj = new Post({
      title: req.body.title,
      type: req.body.type,
      url: req.body.url,
      ...(req.file.path && { imageUrl: req.file.path }),
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

router.get("/dashboard/:id", (req, res) => {
  if (!objectID.isValid(req.params.id)) {
    return res.status(400).send(err + "no post with given id");
  }
  Post.findById(req.params.id, (err, doc) => {
    if (err) {
      return res.send(err + "Error retrieving post");
    }
    res.status(200).json(doc);
  });
});

router.put("/dashboard/:id", upload, async (req, res) => {
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

router.delete("/dashboard/:id", (req, res) => {
  if (!objectID.isValid(req.params.id)) {
    return res.status(400).send(err + `no post with given id ${req.params.id}`);
  }
  Post.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) {
      return res.send(`error deleting post with id ${req.params.id}`);
    }

    cloudinary.uploader.destroy(doc.imageId, (error, result) => {
      console.log(result, error);
    });
    res.status(200).json(doc);
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
      res.status(500).send("Error, try again " + err.message);
    } else {
      res.status(200).send("Email sent successfully");
    }
  });
});

module.exports = router;
