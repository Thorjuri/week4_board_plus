const Joi = require("joi")

const user_validation = { 
	user_singup : async (req, res, next) =>{ 
    	const body = req.body; 
    	const schema = Joi.object().keys({ 
    		userId: Joi.string().min(4).max(20).required(),
            nickname: Joi.string().required()
                        .pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')), 
        	password: Joi.string()
                         .pattern(new RegExp('^[a-zA-Z0-9]{4,20}$')),
            confirmPassword: Joi.ref('password'), 
        	email: Joi.string().email().required(), 
        	}); 
    
    try { // 검사시작 
    	await schema.validateAsync(body); 
    } catch (error) { // 유효성 검사 에러 
    	return res.status(400).json({ code: 400, message: error.message });
    	} 
    next(); 
    }
    
  }; 
    
    module.exports = user_validation;


 