const jwt = require("jsonwebtoken");
const { User2, Post, Comment } = require("../models");

// 미들웨어 - 사용자인증 (sequelize 변경)
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    //thunder Client로 사용자인증 미들웨어 테스트 할때만 body로 토큰보내기
    // const { authType, authToken } = req.body;


    if (!authToken || authType !== "Bearer") {
      res.status(401).send({
        errorMessage: "11로그인 후 이용 가능한 기능입니다.",
      });
      return;
    }
  
    try {
      const { userId } = jwt.verify(authToken, "access-secret-key");
      //mongoose에서sequelize 로 바꿨을때 변경된부분. pk 기본키 사용
      User2.findAll({
        where: {userId:userId}
      }).then((user) => {
        res.locals.user = user;
        console.log("성공")
        next();
      });
    } catch (err) {
      res.status(401).send({
        errorMessage: "22로그인 후 이용 가능한 기능입니다.",
      });
    }
  };
  
  
  
  
  
  
  
  // //------- 내가 작성한거----------------
  // //미들웨어 기본 틀 (exports에다가 함수 실어주면됨. next 필수)
  // module.exports = (req,res,next) => {
  //     //로그인 성공 시, 헤더 안의 토큰 받아오기
  //     const { authorization }  = req.headers;
  //     // 배열 다중 할당으로 토큰안에 토큰값만 추출 
  //     const [tokenType, tokenValue] = authorization.split(' ')
      
  //     //토큰 타입이 'Bearer'가 아니면 이 단계에서 탈출, next 호출안되게.
  //     //토큰 타입이 'Bearer'면 통과해서 next 호출. api 접근 가능.
  //     if(tokenType !== 'Bearer') {
  //         res.status(400).send({
  //             errorMessage: "로그인 후 사용하세요."
  //         });
  //         return;
  //     }
  
  //     try {
  //         //검증하기
  //         const { userId } = jwt.verify(tokenValue, "my-secret-key");
  //         //미들웨어를 사용하를 라우터에서는 굳이 또 db에서 사용자정보 가져오지 않아도 되게
  //         User.findById(userId).exec().then((user) => {
  //            //이 locals라는 공간에 담아둔다. 그리고 언제든 꺼내 쓸 수 있게.
  //             res.locals.user = user;
  //             //위 과정이 작동 잘 된 경우에만 next
  //             next();
  //         });
          
  //     } catch (error) {
  //         res.status(400).send({
  //             errorMessage: "로그인 후 사용하세요."
  //         });
  //         return; //에러일 시 return 없으면 그냥 넘어가서 next 읽어버림
  //     }
  
      
  // }
  