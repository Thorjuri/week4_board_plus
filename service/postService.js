const PostRepository = require('../repository/postRepository')

class PostService {
    postRepository = new PostRepository();

    getPost = async() => {
        const getPostData = await this.postRepository.getPost();
        return getPostData
    };

    createPost = async(nickname, title, postContent, password)=> {
        const createPostData = await this.postRepository.createPost(nickname, title, postContent, password);
        return createPostData;
    };

    getPostOne = async(postId)=> {
        const getPostOneData = await this.postRepository.getPostOne(postId);
        return getPostOneData;
    };

    updatePost = async(postId, title, postContent, inputPassword)=> {
        const updatePostData = await this.postRepository.updatePost(postId, title, postContent, inputPassword);
        return updatePostData;
    };

    deletePost = async(postId, inputPassword)=> {
        const deletePostData = await this.postRepository.deletePost(postId, inputPassword);
        return deletePostData;
    };

    updateLike = async(postId, nickname)=> {
        const updateLikeData = this.postRepository.updateLike(postId, nickname);
        return updateLikeData;
    };
};

module.exports = PostService;