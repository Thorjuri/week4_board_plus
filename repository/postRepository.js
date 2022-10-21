const { User2, Post, Comment, Likes } = require("../models");
const router = require("../routes");


class PostRepository {

    //updeatePost, deletePost 에 쓸 예외처리 메소드
    exception = async(postId, inputPassword)=> {
        const existsPost =  await Post.findOne({ where: { postId: postId } });
         //예외처리1: 게시글 없음
         if(!existsPost){
             return {message: `${postId}번 게시글이 존재하지 않습니다`, data: null};
         };
         //예외처리2: 비밀번호 불일치
         if(inputPassword !== existsPost.password ) {
             return {message: '비밀번호를 확인해주세요', data: null};
         };
     };

    getPost = async()=>{
        const getPostData = await Post.findAll({});
        
        if(getPostData.length < 1){
            return {message : "게시글이 존재하지 않습니다", data: null}
        }
        const postSort = getPostData.sort((a,b) => {
            if(a.createAt > b.createAt) return -1;
            if(a.createAt < b.createAt) return 1;
            return 0;
        })

        return {message: '전체 글 목록', data: postSort}         
    };


    createPost = async(nickname, title, postContent, password)=> {
            const posts = await Post.findAll({});
            let newPostId;
            if(posts.length ===0){
                newPostId = 1
            }else{
                const postId = posts.map((post)=>{return post.postId});
                const postIdMax = Math.max(...postId)
                newPostId = postIdMax + 1
            }

            try{
                const createPostData = await Post.create({ postId:newPostId, title, postContent, postName:nickname, password });
                await Likes.create({
                    postId: newPostId
                });
                return {data: createPostData, message: `${newPostId}번째 글이 저장되었습니다`};
            }catch (error) {
                return{data: error.message, message: '게시글 저장중 에러가 발생했습니다'};
            };
    };


    getPostOne = async(postId)=> {
        const getPostOneData = await Post.findOne({ where : {postId : postId}});
        
        if(!getPostOneData){
            return {message: `${postId}번 게시글이 존재하지 않습니다.`, data: null };
        }
            return {message: `${postId}번 게시글`, data: getPostOneData };
    };


    updatePost = async(postId, title, postContent, inputPassword)=> {
        const exceptionResult =  await this.exception(postId, inputPassword); //예외처리
        if(exceptionResult){
            return exceptionResult
        }
        
        await Post.update({ title, postContent },{ where : { postId } })
        const updatePostData = await Post.findOne({ where: { postId }})
        return {message: `${postId}번 게시글을 수정했습니다`, data: updatePostData};
    };
    

    deletePost = async(postId, inputPassword)=> {
        const exceptionResult =  await this.exception(postId, inputPassword); //예외처리
        if(exceptionResult){
            return exceptionResult
        }
        try {    
            await Post.destroy({ where: {postId: postId}});
            return {message: `${postId}번 게시글을 삭제했습니다.`}
        } catch (error) {
            return {message: `${error.message}`}
        }; 
    };  


    updateLike = async(postId, nickname)=> {
        const existLike = await Likes.findAll({ where : {postId, nickname} });  
        
        let result;
        if(existLike.length > 0){
            if(existLike[0].like === 0){
                await Likes.update({ like : 1}, { where : { postId, nickname}})
                result =  {message : `${postId}번 글에 ${nickname}님이 좋아요 +1 하셨습니다`} //Likes 테이블에 있고 좋아요 0 --> 1로 업데이트(반영)
            }else {
                await Likes.update({ like : 0}, {where : {postId, nickname}})
                result = {message : `${postId}번 글에 ${nickname}님이 좋아요 취소하셨습니다`} //Likes 테이블에 있고 좋아요 1 --> 0으로 업데이트(취소)
            }
        } else {
            await Likes.create({ postId, nickname, like: 1})
            result = {message : `${postId}번 글에 ${nickname}님이 좋아요 +1 하셨습니다`} //Likes 테이블에 없음(첫 좋아요) --> 1로 생성(반영)
        }
            const totalLikes = await Likes.findAll({ where: { postId, like : 1 }}) //해당번호 글의 총 like 수
            const sumLikes = totalLikes.length;
            await Post.update({ likes: sumLikes }, { where : { postId }}) //Post 테이블의 해당글에도 총 like 수 업데이트 
        
            return result
    };

};


module.exports = PostRepository;