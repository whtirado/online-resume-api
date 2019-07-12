const joi = require('@hapi/joi');

const authSchemaSignin = joi.object().keys({
	email: joi
		.string()
		.email()
		.required(),
	password: joi.string().required(),
});

const authSchemaSignup = joi.object().keys({
	email: joi
		.string()
		.email()
		.min(8)
		.max(50)
		.required(),
	password: joi
		.string()
		.min(8)
		.max(20)
		.required(),
});

exports.validateSignin = (reqBody) => {
	return joi.validate(reqBody, authSchemaSignin);
};

exports.validateSignup = (reqBody) => {
	return joi.validate(reqBody, authSchemaSignup);
};
