const { User2, Post, Comment, Likes } = require("../models");
const router = require("../routes");
// const router = express.Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
// const { User2, Post, Comment, Likes } = require("../models");
const authMiddleware = require("../middlewares/auth_middleware");
const user_validation = require('../validation/user_validation')


class UserRepository {

    createUser = async(userId, nickname, email, password) =>{
        const existUsers = await User2.findOne({
            where: { [Op.or]: [{ nickname }, { userId }]},
        });
        if(existUsers){
            if(existUsers.nickname === nickname){
                return {message : '중복된 닉네임입니다.'}
            }else {
                return {message : '중복된 아이디입니다.'}
            };
        };       

        const createUserData = await User2.create({ userId, email, nickname, password });

        return {message: '회원가입에 성공했습니다', data: createUserData};    
    };


    login = async(userId, password)=> {     
        const user = await User2.findOne({ where: { userId, password } });
        
            if (!user) {  //예외처리3. 가입된 유저 정보 없음
                return {message: '일치하는 회원정보가 없습니다. 아이디 및 비밀번호를 확인해주세요.'};
            };
    
        const token = jwt.sign({ userId: user.userId }, "access-secret-key");
        return {token:token, message:null};
    };


    getUser = async(nickname)=> {
        const likes = await Likes.findAll({ 
            where: { nickname, like : 1 }
        });
        const userInfo = await User2.findOne({ where : { nickname }}) 
        let post;
        let likePosts = []
        for(let like of likes){
            post = await Post.findAll({
                where: { postId : like.postId }
            });
            likePosts.push(post[0]) 
        };
        return {data : likePosts, user: userInfo};
    };
};  
  


module.exports = UserRepository;