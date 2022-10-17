const express = require('express');
const router = express.Router();
const postRouter = require('./post.js');
const usersRouter = require('./users.js')
const commentRouter = require('./comment.js')

//전역 미들웨어

router.use("/post", postRouter);
router.use("/users", usersRouter);
router.use("/comment", commentRouter);

module.exports = router; 