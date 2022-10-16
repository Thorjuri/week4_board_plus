const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User2, Post, Comment, Likes } = require("../models");
const authMiddleware = require("../middlewares/auth_middleware");



// 게시글 목록 전체 불러오기 
router.get('/list', async(req, res) => {   
    const posts = await Post.findAll({});

    if(posts.length < 1){
        res.status(400).send({
            errorMessage: "게시글이 존재하지 않습니다."
        })
        return;
    }

    const postSort = posts.sort((a,b) => {
        if(a.postDate > b.postDate) return -1;
        if(a.postDate < b.postDate) return 1;
        return 0;
    })
    
	res.send({postSort});  
});

// authMiddleware,
//게시글 작성
router.post('/write', authMiddleware, async(req,res)=>{
    // const { user } = res.locals;
    // console.log(user);
    const posts = await Post.findAll({});
    const post = posts.map((post)=>{return post.postId})
    const postIdMax = Math.max(...post)
    const today = new Date()
    const year = today.getFullYear();
    const month = today.getMonth()+1
    const day = ('0' + today.getDate()).slice(-2)
    const time = today.toLocaleTimeString('ko-kr')
    
    const existsPost = postIdMax + 1
    const {title, postContent, password} = req.body;
    const postDate = `${year}/${month}/${day} ${time}`

    const { user } = res.locals;
    const nickname = user[0].nickname

    try{
    await Post.create({
            // likes: 0,
            postId: existsPost, 
            title: title,
            postContent: postContent,
            postName: nickname,
            postDate: postDate,
            password: password
    })
    await Likes.create({
        postId: existsPost
    })
    res.send("게시글이 저장되었습니다.");
} catch (error) {
    res.status(400).send({
        errorMessage: "게시글 저장 중 문제가 발생했습니다."
    })
    return;
}
});






//게시글 상세보기 
router.get('/:postId', async(req, res) => {     
    const {postId} = req.params;
    const posts = await Post.findAll({
        where: {
            postId:postId
        }
    });  
    if(posts.length<1){
        res.status(400).send({
            errorMessage: "게시글이 존재하지 않습니다."
        })
        return;
    }
	res.send({posts}); 
});





//게시글 수정
router.put("/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const { inputPassword, postContent } = req.body;
    const existsPost = await Post.findAll({
        where: {
            postId: postId
        }
    });
    //예외처리1: 게시글 없음
    if(existsPost.length<1){
        res.status(400).send({
            errorMessage: "게시글이 존재하지 않습니다."
        });
        return;
    };

    //목표 게시글의 비밀번호
    const password = existsPost[0].password 
   
    //예외처리2: 비밀번호 불일치
    if(inputPassword!==password) {
        res.status(400).send({
            errorMessage: "비밀번호가 틀립니다."
        })
        return;
    }
    //게시글 수정
    await Post.update({
        postContent: postContent
    },
    {
        where: { 
            postId : postId 
        }
    })
    res.send( "게시글이 수정되었습니다.");
  });


  
//게시글 삭제
router.delete('/:postId', authMiddleware, async(req,res)=>{
    const {postId} = req.params;
    const { inputPassword } = req.body;
    const existsPost = await Post.findAll({
        where: { postId : postId }
        });

    if(existsPost.length<1){
        res.status(400).send({
            errorMessage: "게시글이 존재하지 않습니다."
        });
        return;
    };

    const password = existsPost[0].password  //게시글 1개가 배열로, 해당 객체의 password 속성

    if (inputPassword!==password){
        res.status(400).send({
            errorMessage: "비밀번호가 틀립니다."
        })
        return;
    }

    await Post.destroy({
        where: {
            postId: postId
        }
    }) 
    res.send( "게시글이 삭제되었습니다.");
});




// 좋아요 반영 및 취소 
router.put('/:postId/like', authMiddleware, async(req,res) => {
    const {postId} = req.params;
    const { user } = res.locals;
    const nickname = user[0].nickname
    const existLike = await Likes.findAll({
        where: {
            postId: postId,
            nickname: nickname
        }
    })

    if(existLike.length > 0){
        console.log(existLike[0].like)
        if(existLike[0].like ===0){
            await Likes.update({
                like: 1
            }, {
                where: {
                    postId: postId,
                    nickname: nickname
                }
            });
            res.send("좋아요 +1 반영되었습니다.")
        } else {
            await Likes.update({
                like: 0
            }, {
                where: {
                    postId: postId,
                    nickname: nickname
                }
            })
            res.send("좋아요 취소 되었습니다.")
            }
        }

    if(existLike.length < 1){
        console.log(existLike.length)
        await Likes.create({
            postId: postId,
            nickname: nickname,
            like: 1
        })
        res.send("좋아요 +1 반영되었습니다.")
    }

    const totalLikes = await Likes.findAll({
        where: { postId: postId,
                 like: 1
        }
    });
    const sumLikes = totalLikes.length;
    await Post.update({
        likes: sumLikes
    },{
        where: {postId: postId}
    })
});





module.exports = router;





