const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const contactRoute = require('./routes/contact');
const corsCtrl = require('./controllers/cors');

mongoose
	.connect(
		`mongodb+srv://${process.env.player}:${
			process.env.item
		}@testdb-lxady.mongodb.net/OnlineResumeDB?w=majority`
	)
	.then(() => {
		console.log('Connected to database');
	})
	.catch((err) => {
		console.log('Database Error', error);
	});

const app = express();

app.use(express.json());
app.use(corsCtrl.headers);
app.use('/api/auth', authRoutes);
app.use('/api/contact/message', contactRoute);
app.use('/*', (req, res) => {
	res.status(404).json({ message: 'Invalid request' });
});

app.listen(process.env.PORT || 5000);
