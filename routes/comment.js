const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User2, Post, Comment } = require("../models");
const authMiddleware = require("../middlewares/auth_middleware");


//댓글 작성하기
router.post('/:postId/write', authMiddleware, async(req,res)=>{
    const {postId} = req.params;
    const post = await Post.findAll({
        where: { postId : postId}
    });
    const { user } = res.locals;
    const nickname = user[0].nickname
    //예외처리1. 게시글이 존재하지 않음
        if(post.length < 1) {
            res.status(400).send({
                errorMessage: "해당 게시글이 존재하지 않습니다."
            })
            return;
        }

    const comments = await Comment.findAll({
        where: { postId : postId}
    });
    let existsComments = 0
    let comment = []
    let cmtIdMax = 0;
    //예외처리2. 기존댓글이 없을 시, cmtId 처리 
        if(comments.length < 1){
            existsComments = 1;
        } else {
            comment = comments.map((cmt)=>{return cmt.cmtId})
            cmtIdMax = Math.max(...comment)
            existsComments = cmtIdMax + 1
        }
    
    const today = new Date()
    const year = today.getFullYear();
    const month = today.getMonth()+1
    const day = ('0' + today.getDate()).slice(-2)
    const time = today.toLocaleTimeString('ko-kr')
    const cmtDate = `${year}/${month}/${day} ${time}`

    const {cmtContent} = req.body;

    //예외처리3. 댓글 공란으로 저장 시 에러
    if (cmtContent === "") {
        res.status(400).send({ 
            errorMessage: "댓글을 입력해주세요." 
        });
        return;
      }

    await Comment.create({
        postId: postId, 
        cmtId: existsComments,
        cmtContent: cmtContent,
        cmtName: nickname,
        cmtDate: cmtDate
    })

    res.send("댓글이 저장되었습니다.");
});



//댓글목록 보기
router.get('/:postId', async(req, res) => {  
    const {postId} = req.params;
    const comments = await Comment.findAll({
        where: { postId : postId }
    });
    //예외처리. 댓글이 존재하지 않을 경우
    if(comments.length < 1){
        res.status(400).send({
            errorMessage: "댓글이 존재하지 않습니다."
        })
        return;
    }
    //댓글 작성 순 내림차순 정렬
    const commentSort = comments.sort((a,b) => {
        return  b.cmtId - a.cmtId
    })
	res.send({commentSort}) 
});



//댓글 수정
router.put("/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const {cmtId, cmtContent} = req.body;
    const post = await Post.findAll({
        where: { postId : postId }
    });
    const comments = await Comment.findAll({
        where: { 
            postId : postId,
            cmtId : cmtId 
        }
    });
    //예외처리 2가지: 게시글 혹은 댓글이 존재하지 않을때
    if(post.length <1){
        res.status(400).send({
            errorMessage: "게시글이 존재하지 않습니다."
        })
        return;
    }else if (comments.length < 1) {
        res.status(400).send({
            errorMessage: "해당 댓글이 존재하지 않습니다."
        })
        return;
    }

    await Comment.update({
       cmtContent : cmtContent
    },
    {
        where: {
            postId: postId,
            cmtId: cmtId
        }
    })

    res.send({ successMessage: "댓글이 수정되었습니다." });
  });


//댓글 삭제
router.delete('/:postId', authMiddleware, async(req,res)=>{
    const {postId} = req.params;
    const {cmtId} = req.body;
    const comments = await Comment.findAll({
        where: { 
            postId : postId,
            cmtId : cmtId 
        }
    });

    if(comments.length < 1){
        res.status(400).send({
            errorMessage: "해당 댓글이 존재하지 않습니다."
        })
        return;
    }

    Comment.destroy({
        where: {
            postId:postId,
            cmtId:cmtId
        }
    });
    
    res.send("댓글을 삭제했습니다.")

});




module.exports = router;


