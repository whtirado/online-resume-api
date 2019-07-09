const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/server.config');

const authRoutes = require('./routes/auth');
const contactRoute = require('./routes/contact');
const corsCtrl = require('./controllers/cors');

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
app.use(corsCtrl.headers);
app.use('/api/auth', authRoutes);
app.use('/api/contact/message', contactRoute);
app.use('/*', (req, res) => {
	res.status(404).json({ message: 'Invalid request' });
});

app.listen(config.mongo.port);
