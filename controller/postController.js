const PostService = require('../service/postService')

class PostController {
    postService = new PostService();

    getPost = async(req, res, next)=> {
        const getPostData = await this.postService.getPost();
        res.send(getPostData)
    };

    createPost = async(req, res, next)=> {
        const {title, postContent, password} = req.body;
        const nickname = res.locals.user[0].nickname;
        const createPostData = await this.postService.createPost(nickname, title, postContent, password);
        res.json({result: createPostData});
    };

    getPostOne = async(req, res, next)=> {
        const {postId} = req.params;
        const getPostOneData = await this.postService.getPostOne(postId);
        res.send(getPostOneData);
    };

    updatePost = async(req, res, next)=> {
        const {postId} = req.params;
        const {title, postContent, inputPassword} = req.body;
        const updatePostData = await this.postService.updatePost(postId, title, postContent, inputPassword);
        res.send(updatePostData);
    };

    deletePost = async(req, res, next)=> {
        const {postId} = req.params;
        const {inputPassword} = req.body;
        const deletePostData = await this.postService.deletePost(postId, inputPassword);
        res.send(deletePostData);
    };

    updateLike = async(req, res, next)=> {
        const {postId} = req.params;
        const nickname = res.locals.user[0].nickname;
        console.log(nickname)
        const updateLikeData = await this.postService.updateLike(postId, nickname);
        res.send(updateLikeData);
    };
};

module.exports = PostController;