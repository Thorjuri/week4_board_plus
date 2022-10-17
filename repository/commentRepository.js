const { User2, Post, Comment, Likes } = require("../models");


class CommentRepository {

    excptPost = async(postId)=> {
        const post = await Post.findOne({ where : {postId}});
        if(!post){ 
            return {message: `${postId}번 게시글이 존재하지 않습니다`, data: null}
        };
    };

    excptCmt = async(postId, cmtId)=> {
        const cmt = await Comment.findOne({ where: { postId, cmtId }});
        if(!cmt){
            return {message: `${cmtId}번 댓글이 존재하지 않습니다`, data: null}
        };
    };

    excptCmtId = async(postId)=> {
        const comment = await Comment.findAll({ where : { postId }});
        let cmtId;
        if(comment.length < 1){
            cmtId = 1;
        }else{
            const cmtIds = comment.map((cmt)=>{return cmt.cmtId})
            const cmtIdMax = Math.max(...cmtIds)
            cmtId = cmtIdMax + 1
        }
        return cmtId
    }


    createComment = async(postId, nickname, cmtContent)=> {

        const excptPostResult = await this.excptPost(postId);  //예외처리1. 게시글 없음
        if (excptPostResult){ return excptPostResult };

        const cmtId = await this.excptCmtId(postId); //에외처리2. cmtId 넘버링
         
        if (cmtContent === "") {
            return {message: '댓글을 입력해주세요', data: null}  //예외처리3. 댓글 공란
        }
        const createCommentData = await Comment.create({ postId, cmtId, cmtContent, cntName:nickname });

        return {message: '댓글을 등록하였습니다.', data: createCommentData};
    };


    getComment = async(postId)=> {
        const excptPostResult = await this.excptPost(postId);  //예외처리1. 게시글 없음
        if (excptPostResult) { return excptPostResult};
        const getCommentData = await Comment.findAll({ where : { postId}});
        return {message: `${postId}번 게시글 댓글 목록`, data: getCommentData};
    };


    updateComment = async(postId, cmtId, cmtContent)=> {
        const excptPostResult = await this.excptPost(postId);  //예외처리1. 게시글 없음
        if (excptPostResult) { return excptPostResult};

        const excptCmtResult = await this.excptCmt(postId, cmtId); //예외처리2. 해당 cmtId 댓글 없음
        if (excptCmtResult) { return excptCmtResult}


        await Comment.update({ cmtContent }, { where : { postId, cmtId }})
        const updateCommentData = await Comment.findOne({ where : { postId, cmtId }})
        return {message: '댓글을 수정했습니다.', data: updateCommentData};
    };

    
    deleteComment = async(postId, cmtId)=> {
        const excptPostResult = await this.excptPost(postId); //예외처리1. 게시글 없음
        if(excptPostResult){ return excptPostResult};

        const excptCmtResult = await this.excptCmt(postId, cmtId); //예외처리2. 해당 cmtId 댓글 없음
        if(excptCmtResult){ return excptCmtResult};

        await Comment.destroy({ where: { postId, cmtId }});
        return {message: `${cmtId}번 댓글을 삭제했습니다.`, data: null};
    };

};


module.exports = CommentRepository;