const express = require('express');
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { User2, Post, Comment, Likes } = require("./models");
const app = express();
const port = 3000;
const boardRouter = require("./routes/index");
const user_validation = require('./validation/user_validation')
const authMiddleware = require("./middlewares/auth_middleware");

const router = express.Router();
app.use(express.json());
app.use("/board", [boardRouter]);




// 1.회원가입 (Joi validation)
<<<<<<< HEAD
app.post('/users', user_validation.user_singup, async (req, res) => {
=======
//해당 경로로 들어오면, user_validation 파일의 user_singup함수를 거쳤다가 돌아옴
//왜냐하면 user_singup함수에 next()를 심어놨기 때문!!
//next()를 통해서 다시 여기(app.js)로 돌아와서 나머지 async(req,res)=> 함수 마저 실행.
app.post('/users', user_validation.user_singup, async (req, res) => {
    //헤더에 토큰 갖고 접근 시, '이미 로그인되어있습니다'에러
>>>>>>> 6f0726616573dad4c0b731b9cc390bd278830e04
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");
    if(authToken){
        res.status(400).send("이미 로그인 되어있습니다.");
        return;
<<<<<<< HEAD
    };

=======
    }
    //회원가입 과정 시작
>>>>>>> 6f0726616573dad4c0b731b9cc390bd278830e04
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
  app.post("/auth", async (req, res) => {
    //헤더에 토큰 갖고 접근 시, '이미 로그인되어있습니다'에러
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");
    if(authToken){
        res.status(400).send("이미 로그인 되어있습니다.");
        return;
<<<<<<< HEAD
    };
=======
    }
>>>>>>> 6f0726616573dad4c0b731b9cc390bd278830e04
    //로그인 과정 시작
    const { userId, password } = req.body;
    const user = await User2.findOne({ where: { userId, password } });
  
    if (!user) {
      res.status(400).send({
        errorMessage: "아이디 또는 패스워드가 잘못됐습니다.",
      });
      return;
<<<<<<< HEAD
    };
=======
    }
>>>>>>> 6f0726616573dad4c0b731b9cc390bd278830e04
  
    const token = jwt.sign({ userId: user.userId }, "access-secret-key");
    res.send({
      token,
    });
  });



// 3. 내 정보 - 내가 좋아요 누른 게시물 보기 (좋아요 내림차순)
  app.get("/users/me", authMiddleware, async (req, res) => {
    const { user } = res.locals;
    const nickname = user[0].nickname
    const likes = await Likes.findAll({
        where: { 
            nickname: nickname,
            like: 1
        }
<<<<<<< HEAD
    });
=======
    })
>>>>>>> 6f0726616573dad4c0b731b9cc390bd278830e04
    let post;
    let likePosts = []
    for(let like of likes){
        post = await Post.findAll({
            where: {
                postId:like.postId
            }
<<<<<<< HEAD
        });
        likePosts.push(post[0])
    };
=======
        })
        likePosts.push(post[0])
    }
>>>>>>> 6f0726616573dad4c0b731b9cc390bd278830e04
    const postSort = likePosts.sort((a,b) => {
        if(a.likes > b.likes) return -1;
        if(a.likes < b.likes) return 1;
        return 0;
<<<<<<< HEAD
    });
=======
    })
>>>>>>> 6f0726616573dad4c0b731b9cc390bd278830e04
    res.send({ postSort });
  });
  


app.get('/', (req,res)=> {
    console.log('메인 페이지');
    res.send('메인 페이지 입니다');
});


app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });

