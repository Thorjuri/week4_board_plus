const express = require('express');
const router = express.Router();

const CommentController = require('../controller/commentController');
const commentController = new CommentController;

const authMiddleware = require("../middlewares/auth_middleware");


//댓글 작성하기
router.post('/:postId/write', authMiddleware, commentController.createComment);

//댓글목록 보기
router.get('/:postId', commentController.getComment);

//댓글 수정
router.put('/:postId', authMiddleware, commentController.updateComment);

//댓글 삭제
router.delete('/:postId', authMiddleware, commentController.deleteComment);


module.exports = router;


