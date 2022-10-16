const express = require('express');
const router = express.Router();
const postRouter = require('./post.js');
const usersRouter = require('./users.js')
const commentRouter = require('./comment.js')
const jwt = require("jsonwebtoken");
const { User2, Post, Comment, Likes } = require("../models");
const authMiddleware = require("../middlewares/auth_middleware");
const likes = require('../models/likes.js');

//전역 미들웨어

router.use("/post", postRouter);
router.use("/users", usersRouter);
router.use("/comment", commentRouter);





module.exports = router; 