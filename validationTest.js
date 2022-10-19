const Joi = require("joi")
const data = require('./v_testdb')
let posts = []

module.exports = {


    findAll : ()=>{
        return posts
    },
    create(post) {
        const posts = this.findAll()

      },
      createOne(postId, title){
        let post = {
            postId: postId,
            title: title
        }
        p
      }
}



