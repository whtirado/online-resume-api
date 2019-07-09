const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config/server.config');
const authRoutes = require('./routes/auth');
const contactRoute = require('./routes/contact');

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

app.use(express.json());

app.use(cors(config.corsOptions));
app.options('*', cors(config.corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/contact/message', contactRoute);

app.use('/*', (req, res) => {
	res.status(400).json({ message: 'Invalid request' });
});

app.listen(config.mongo.port);
