const CommentRepository = require('../repository/commentRepository')

class CommentService {
    commentRepository = new CommentRepository();

    createComment = async(postId, nickname, cmtContent)=> {
        const createCommentData = await this.commentRepository.createComment(postId, nickname, cmtContent);
        return createCommentData;
    };
  
    getComment = async(postId)=> {
        const getCommentData = await this.commentRepository.getComment(postId);
        return getCommentData;
    };

    updateComment = async(postId, cmtId, cmtContent)=> {
        const updateCommentData = await this.commentRepository.updateComment(postId, cmtId, cmtContent);
        return updateCommentData;
    };

    deleteComment = async(postId, cmtId)=> {
        const deleteCommentData = await this.commentRepository.deleteComment(postId, cmtId);
        return deleteCommentData;
    };
};

module.exports = CommentService;