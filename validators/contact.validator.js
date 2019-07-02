const joi = require('@hapi/joi');

const contacSchema = joi.object().keys({
	date: joi.string().required(),
	isRead: joi.boolean().required(),
	name: joi
		.string()
		.min(3)
		.max(20)
		.required(),
	email: joi
		.string()
		.email()
		.min(8)
		.max(50)
		.required(),
	subject: joi
		.string()
		.min(3)
		.max(30)
		.required(),
	message: joi
		.string()
		.min(10)
		.max(250)
		.required(),
});

exports.validate = (reqBody) => {
	return joi.validate(reqBody, contacSchema);
};
