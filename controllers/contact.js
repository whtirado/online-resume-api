const Contact = require('../models/contact');
const contactValidator = require('../validators/contact.validator');
const webToken = require('jsonwebtoken');

const tokenKey = 'super_secret_password';

exports.submitMessage = (req, res) => {
	const contactMessage = new Contact(req.body);
	const validator = contactValidator.validate(req.body);
	if (validator.error) {
		res.status(400).json({
			message: validator.error.details[0].message,
		});
	} else {
		contactMessage
			.save()
			.then((response) => {
				res.status(200).json({
					message: 'Message successfully submitted.',
					validator,
				});
			})
			.catch((error) => {
				res.status(500).json({
					message: 'Failed to submit message',
					error,
				});
			});
	}
};

exports.getMessages = (req, res) => {
	webToken.verify(req.body.token, tokenKey, (error, decoded) => {
		if (error) {
			res.status(401).json({
				message: 'Unauthorized request',
				data: error,
			});
		} else {
			Contact.find()
				.then((response) => {
					res.status(200).json({
						message: 'Messages fetched successfully',
						data: response,
					});
				})
				.catch((error) => {
					res.status(404).json({
						message: 'Failed to get messages',
						data: error,
					});
				});
		}
	});
};
