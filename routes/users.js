const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User2, Post, Comment, Likes } = require("../models");
const authMiddleware = require("../middlewares/auth_middleware");
const user_validation = require('../validation/user_validation')


// 1.회원가입 (Joi validation)
router.post('/', user_validation.user_singup, async (req, res) => {
    //헤더에 토큰 갖고 접근 시, '이미 로그인되어있습니다'에러

    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");
    if(authToken){
        res.status(400).send("이미 로그인 되어있습니다.");
        return;
    };

    const { userId, nickname, email, password, confirmPassword } = req.body;
    const existUsers = await User2.findAll({
        where: {
            [Op.or]: [{ nickname }, { userId }],
          },
    });
    for (let existUser of existUsers){
        if(existUser.nickname === nickname) {
            res.status(400).send({
                errorMessage: "중복된 닉네임입니다.",
              });
              return;
        } else if (existUser.userId === userId) {
            res.status(400).send({
                errorMessage: "중복된 아이디입니다.",
              });
              return;
        }
    }
  
    await User2.create({ userId, email, nickname, password });
  
    res.status(201).send({ message: "회원 가입에 성공하였습니다." });

  });




// 2.로그인(토큰 발급)
  router.post("/auth", async (req, res) => {
    //헤더에 토큰 갖고 접근 시, '이미 로그인되어있습니다'에러
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");
    if(authToken){
        res.status(400).send("이미 로그인 되어있습니다.");
        return;
    };
    //로그인 과정 시작
    const { userId, password } = req.body;
    const user = await User2.findOne({ where: { userId, password } });
  
    if (!user) {
      res.status(400).send({
        errorMessage: "아이디 또는 패스워드가 잘못됐습니다.",
      });
      return;
    };
  
    const token = jwt.sign({ userId: user.userId }, "access-secret-key");
    res.send({
      token,
    });
  });



// 3. 내 정보 - 내가 좋아요 누른 게시물 보기 (좋아요 내림차순)
  router.get("/me", authMiddleware, async (req, res) => {
    const { user } = res.locals;
    const nickname = user[0].nickname
    const likes = await Likes.findAll({
        where: { 
            nickname: nickname,
            like: 1
        }
    });
    let post;
    let likePosts = []
    for(let like of likes){
        post = await Post.findAll({
            where: {
                postId:like.postId
            }
        });
        likePosts.push(post[0])
    };
    const postSort = likePosts.sort((a,b) => {
        if(a.likes > b.likes) return -1;
        if(a.likes < b.likes) return 1;
        return 0;
    });
    res.send({ postSort });
  });
  



module.exports = router;
