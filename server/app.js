require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { Sequelize } = require('./models/index');

const app = express();
const port = process.env.PORT || 3001;

// add middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// add routes
app.use('/api/v1', require('./routes/index'));

Sequelize.sync({
	force: false,
	logging: false,
})
	.then(() => {
		app.listen(port, () => {
			console.log('Server started on :' + port);
		});
	})
	.catch((err) => {
		console.log('Server Error : ', err);
	});
