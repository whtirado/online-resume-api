const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
	date: { type: Date, required: true },
	isRead: { type: Boolean, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	subject: { type: String, required: true },
	message: { type: String, required: true },
});

module.exports = mongoose.model('Contact', contactSchema);
