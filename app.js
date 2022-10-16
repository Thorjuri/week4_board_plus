const express = require('express');
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { User2, Post, Comment, Likes } = require("./models");
const app = express();
const port = 3000;
// const boardRouter = require("./routes/index");
const user_validation = require('./validation/user_validation')
const authMiddleware = require("./middlewares/auth_middleware");
const Router = require('./routes/index.js')

const router = express.Router();
app.use(express.json());
// app.use("/board", [boardRouter]);
app.use("/", Router);






// app.get('/', (req,res)=> {
//     console.log('메인 페이지');
//     res.send('메인 페이지 입니다');
// });


app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });