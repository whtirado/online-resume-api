const joi = require('@hapi/joi');

const authSchema = joi.object().keys({
	email: joi
		.string()
		.email()
		.min(8)
		.max(20)
		.required(),
	password: joi
		.string()
		.min(8)
		.max(20)
		.required(),
});

exports.validate = (reqBody) => {
	return joi.validate(reqBody, authSchema);
};
