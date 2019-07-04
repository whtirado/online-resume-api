const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config/server.config');

const authRoutes = require('./routes/auth');
const contactRoute = require('./routes/contact');

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

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/contact/message', contactRoute);
app.use('/*', (req, res) => {
	res.status(404).json({ message: 'Invalid request' });
});

const port = process.env.PORT || 5000;

app.listen(port);
