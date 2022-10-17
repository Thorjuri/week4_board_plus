const CommentService = require('../service/commentService')

class CommentController {
    commentService = new CommentService();

    createComment = async(req, res, next)=> {
        const {postId} = req.params;
        const {cmtContent} = req.body;
        const nickname = res.locals.user[0].nickname;
        const createCommentData = await this.commentService.createComment(postId, nickname, cmtContent);
        res.send(createCommentData);
    };

    getComment = async(req, res, next)=>{
        const {postId} = req.params;
        const getCommentData = await this.commentService.getComment(postId);
        res.send(getCommentData);
    };

    updateComment = async(req, res, next)=> {
        const {postId} = req.params;
        const {cmtId, cmtContent} = req.body;
        const updateCommentData = await this.commentService.updateComment(postId, cmtId, cmtContent);
        res.send(updateCommentData);
    };

    deleteComment = async(req, res, next)=> {
        const {postId} = req.params;
        const {cmtId} = req.body;
        const deleteCommentData = await this.commentService.deleteComment(postId, cmtId);
        res.send(deleteCommentData);
    };

};

module.exports = CommentController;