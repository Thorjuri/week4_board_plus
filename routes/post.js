const express = require('express');
const router = express.Router();

const PostController = require('../controller/postController');
const postController = new PostController();

const authMiddleware = require("../middlewares/auth_middleware");


//게시글 전체 목록
router.get('/list', postController.getPost);


//게시글 작성
router.post('/write', authMiddleware, postController.createPost);


//게시글 상세보기 
router.get('/:postId', postController.getPostOne);


//게시글 수정
router.put('/:postId', authMiddleware, postController.updatePost);

  
//게시글 삭제
router.delete('/:postId', authMiddleware, postController.deletePost);


//좋아요 반영 및 취소 
router.put('/:postId/like', authMiddleware, postController.updateLike);



module.exports = router;





