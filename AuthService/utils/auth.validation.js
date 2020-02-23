const Joi = require('@hapi/joi');


// SIGN-UP VALIDATE 
const signUpValidate = (data) => {
    const schema = {
        firstname: Joi.string().min(6).max(45).required(),
        lastname: Joi.string().min(6).max(45).required(),
        email: Joi.string().min(6).max(30).required(),
        password: Joi.string().min(8).required(),
        confirm: Joi.string().min(8).required()
    }
    return Joi.object(schema).validate(data);
}

// SIGN-IN VALIDATE
const signInValidate = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    }

    return Joi.object(schema).validate(data);
}

module.exports.signUpValidate = signUpValidate;
module.exports.signInValidate = signInValidate;
