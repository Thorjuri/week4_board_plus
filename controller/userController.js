const UserService = require('../service/userService')

class UserController {
    userService = new UserService();

    excptLogin = async(req)=> {
        const { authorization } = req.headers;
        const [authType, authToken] = (authorization || "").split(" ");
        if(authToken){
            return {errorMessage : '이미 로그인 되어 있습니다.'};
        };
      };

    createUser = async(req, res, next)=> {
        const excptLoginResult = await this.excptLogin(req); //예외처리1. 이미 로그인 된 상태
            if (excptLoginResult) {
                res.status(400).send(excptLoginResult);
                return;
            }
        const {userId, nickname, email, password} = req.body;
        const createUserData = await this.userService.createUser(userId, nickname, email, password);
        
        res.status(201).send(createUserData);
    };

    login = async(req, res, next)=> {
        const excptLoginResult = await this.excptLogin(req); //예외처리1. 이미 로그인 된 상태
            if (excptLoginResult) {
                res.status(400).send(excptLoginResult);
                return;
            }
        const { userId, password } = req.body;  

        if(!userId || !password){  //예외처리2. 아이디 혹 비밀번호 공란
            res.status(400).send({ errorMessage : '아이디와 비밀번호를 모두 입력하세요.'});
            return;
        };
        const loginData = await this.userService.login(userId, password);
        res.send(loginData);
    };


    getUser = async(req, res, next)=> {
        const nickname = res.locals.user[0].nickname;
        const getUserData = await this.userService.getUser(nickname);
        res.status(201).send(getUserData);
    };
};

module.exports = UserController;