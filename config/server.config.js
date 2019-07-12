const whitelist = [
	'https://whtirado-online-resume.herokuapp.com',
	'http://localhost:4200',
];

const corsOptions = {
	// origin: function(origin, callback) {
	// 	if (whitelist.indexOf(origin) !== -1) {
	// 		callback(null, true);
	// 	} else {
	// 		callback(new Error('Not allowed by CORS'));
	// 	}
	// },
	origin: '*',
	allowedHeaders:
		'Origin, X-Requested-With, Content-Type, Accept, Authorization',
	methods: 'GET, POST, PUT, DELETE, OPTIONS',
};

const config = {
	user: process.env.USER || 'whtirado',
	password: process.env.PASSWORD || 'mongo',
	port: process.env.PORT || 5000,
};

exports.mongo = config;
exports.corsOptions = corsOptions;
