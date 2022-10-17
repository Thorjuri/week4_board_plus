const UserRepository = require('../repository/userRepository');

class UserService {

    userRepository = new UserRepository();

    createUser = async(userId, nickname, email, password) => {
        const createUserData = await this.userRepository.createUser(userId, nickname, email, password);
        return createUserData;
    };


    login = async(userId, password)=> {
        const loginData = await this.userRepository.login(userId, password);
        return loginData;
    };


    getUser = async(nickname) => {
        const getUserData = await this.userRepository.getUser(nickname);
        const likePost = getUserData.data; 

        const postSort = likePost.sort((a,b) => {
            if(a.likes > b.likes) return -1;
            if(a.likes < b.likes) return 1;
            return 0;
        });

        return {user: getUserData.user, data: postSort};
    };
};

module.exports = UserService;