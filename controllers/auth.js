const Auth = require('../models/auth');
const webToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const tokenKey = 'super_secret_password';

exports.loginUser = (req, res) => {
	let userData;
	Auth.findOne({ email: req.body.email })
		.then((data) => {
			if (!data) {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
			userData = data;
			return bcrypt.compare(req.body.password, data.password);
		})
		.then((response) => {
			if (response) {
				const tokenData = {
					id: userData._id,
					email: userData.email,
					date: new Date(),
				};
				res.status(200).json({
					message: 'User Verified',
					token: webToken.sign(tokenData, tokenKey, {
						expiresIn: '1h',
					}),
				});
			} else {
				res.status(401).json({
					message: 'Authentication Error',
				});
			}
		})
		.catch((error) => {
			res.status(401).json({
				message: 'Authentication Error',
			});
		});
};

exports.signupUser = (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const newUser = new Auth({
				email: req.body.email,
				password: hash,
			});

			newUser
				.save()
				.then((data) => {
					res.status(200).json({ message: 'User added' });
				})
				.catch((error) => {
					res.status(401).json({
						message: 'User not added',
						data: error,
					});
				});
		})
		.catch((error) => {
			res.status(500).json({ message: 'Password hashing failed' });
		});
};

exports.validateToken = (req, res) => {
	try {
		const decodedToken = webToken.verify(req.body.token, tokenKey, {
			expiresIn: '1h',
		});
		res.status(200).json({ verified: true });
	} catch (err) {
		res.status(401).json({ verified: false });
	}
};
