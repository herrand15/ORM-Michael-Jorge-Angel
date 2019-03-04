console.log('perfecto');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('sqlite:database.db');

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

const User = sequelize.define('users', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    } }, {
    timestamps: false
});


// force: true will drop the table if it already exists
User.create({
        firstName: 'Jorge',
        lastName: 'Hancock'
    });

User.findAll().then(users => {
    console.log(users);
});

/*
User
    .find({ where: { username: 'John' } })
    .then(function(err, John) {
        if (!John) {
            console.log('No user with the username "john-doe" has been found.');
        } else {
            console.log('Hello ' + John.username + '!');
            console.log('All attributes of john:', John.get());
        }
    });
*/
/*
var User = sequelize.define('Users', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    tableName: 'Users', // this will define the table's name
    timestamps: false           // this will deactivate the timestamp columns
})

/*
User.create({
    username: 'john-doe',
    password: 'i-am-so-great'
}).then(function(user) {
    /!* ... *!/\
})*/
