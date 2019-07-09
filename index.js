const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/server.config');

const authRoutes = require('./routes/auth');
const contactRoute = require('./routes/contact');
// const corsCtrl = require('./controllers/cors');
const cors = require('cors');

const app = express();

mongoose
	.connect(
		`mongodb+srv://${config.mongo.user}:${
			config.mongo.password
		}@testdb-lxady.mongodb.net/OnlineResumeDB?w=majority`,
		{ useNewUrlParser: true }
	)
	.then(() => {
		console.log('Connected to database');
	})
	.catch((err) => {
		console.log('Database Error', err);
	});

const whitelist = [
	'https://whtirado-online-resume.herokuapp.com',
	'http://localhost:4200',
];
const corsOptions = {
	origin: function(origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

app.use(express.json());

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/contact/message', contactRoute);

app.use('/*', (req, res) => {
	res.status(400).json({ message: 'Invalid request' });
});

app.listen(config.mongo.port);
