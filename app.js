var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
 * All about sequelize
 * @type {Sequelize}
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize('sqlite:database.db');
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

var Address = sequelize.define(
	'address',
	{
		id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
		street: Sequelize.STRING,
		city: Sequelize.STRING(100),
		province: Sequelize.STRING(100),
		country: Sequelize.STRING(100),
		postcode: Sequelize.STRING(50),
	},
	{timestamps: false}
);


app.get('/data', (req, res) => {
	Address.findAll()
		.then(addresses => {
			res.send(JSON.stringify(addresses));
		});
});

app.get('/delete', (req,res) => {
	var delId = req.param('id');
	Address.destroy({where: {id: delId}})
		.then(function(rowDeleted){
			if(rowDeleted === 1){
				console.log('Deleted successfully');
			}
		});
	res.redirect('/');
});


app.post('/submit-form', (req, res) => {

	Address.sync().then(function () {
		if (req.body.inputId == -1) {
			return Address.create({
				street: req.body.inputStreet,
				city: req.body.inputCity,
				province: req.body.inputProvince,
				country: req.body.inputCountry,
				postcode: req.body.inputPostCode,
			});
		}
		else {
			return Address.create({
				id: req.body.inputId,
				street: req.body.inputStreet,
				city: req.body.inputCity,
				province: req.body.inputProvince,
				country: req.body.inputCountry,
				postcode: req.body.inputPostCode,
			});
		}
	});
	res.redirect('/');
});
/**
 * End Sequelize
 */

module.exports = app;
