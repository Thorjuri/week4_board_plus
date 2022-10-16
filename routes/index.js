const express = require('express');
const router = express.Router();
const postRouter = require('./post.js');
const jwt = require("jsonwebtoken");
const { User2, Post, Comment, Likes } = require("../models");
const authMiddleware = require("../middlewares/auth_middleware");
const likes = require('../models/likes.js');


// post.js 로 이동
router.use("/post", [postRouter]);


// 게시글 목록 전체 불러오기 
router.get('/list', async(req, res) => {   
    const posts = await Post.findAll({});

    if(posts.length < 1){
        res.status(400).send({
            errorMessage: "게시글이 존재하지 않습니다."
        })
        return;
    }

    const postSort = posts.sort((a,b) => {
        if(a.postDate > b.postDate) return -1;
        if(a.postDate < b.postDate) return 1;
        return 0;
    })
    
	res.send({postSort});  
});

// authMiddleware,
//게시글 작성
router.post('/write', authMiddleware, async(req,res)=>{
    // const { user } = res.locals;
    // console.log(user);
    const posts = await Post.findAll({});
    const post = posts.map((post)=>{return post.postId})
    const postIdMax = Math.max(...post)
    const today = new Date()
    const year = today.getFullYear();
    const month = today.getMonth()+1
    const day = ('0' + today.getDate()).slice(-2)
    const time = today.toLocaleTimeString('ko-kr')
    
    const existsPost = postIdMax + 1
    const {title, postContent, password} = req.body;
    const postDate = `${year}/${month}/${day} ${time}`

    const { user } = res.locals;
    const nickname = user[0].nickname

    try{
    await Post.create({
            // likes: 0,
            postId: existsPost, 
            title: title,
            postContent: postContent,
            postName: nickname,
            postDate: postDate,
            password: password
    })
    await Likes.create({
        postId: existsPost
    })
    res.send("게시글이 저장되었습니다.");
} catch (error) {
    res.status(400).send({
        errorMessage: "게시글 저장 중 문제가 발생했습니다."
    })
    return;
}
});


//라우트해서 도착할 페이지에 필요
module.exports = router;
