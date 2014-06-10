var ACS = require('acs').ACS;
var logger = require('acs').logger;
var sdk = ACS.initACS('tZguppAg3gt9slE84nA7qgM6wxZeDYI1');

//create a new user
function signup(req, res) {
	var data = {
		username: req.body.user_name,
		password: req.body.password,
		password_confirmation: req.body.password,
		custom_fields: {
			group: req.body.group
		}
	};
	
	ACS.Users.create(data, function(data) {
		logger.debug("######Create######");
		logger.debug(JSON.stringify(data, null, 2));
		if(data.success) {
			var user = data.users[0];
			if(user.first_name && user.last_name) {
				user.name = user.first_name + ' ' + user.last_name;
			} else {
				user.name = user.username;
			}
			logger.info('Created user: ' + user.name);
			req.session.user = user;
			req.session.session_id = data.meta.session_id;
			res.redirect('/');
		} else {
			logger.info("Create user error: " + data.message);
			res.render('signup', {message: data.message});
		}
	}, req, res);
}

//do ACS user login
function login(req, res) {
	var data = {
		login: req.body.username,
		password: req.body.password
	};
	ACS.Users.login(data, function(data){
		logger.debug("######login######");
		//logger.debug(JSON.stringify(data, null, 2));
		if(data.success) {
			var user = data.users[0];
			if(user.first_name && user.last_name) {
				user.name = user.first_name + ' ' + user.last_name;
			} else {
				user.name = user.username;
			}
			req.session.user = user;
			req.session.session_id = data.meta.session_id;
			res.redirect('/');
		} else {
			logger.info("Login error: " + data.message);
			res.render('login', {user: undefined, message: data.message});
		}
	}, req, res);
}

function update(req, res) {
	var data = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
	};
	ACS.Users.update(data, function(data) {
		logger.debug("######update######");
		logger.debug(JSON.stringify(data, null, 2));
		if(data.success) {
			var user = data.users[0];
			if(user.first_name && user.last_name) {
				user.name = user.first_name + ' ' + user.last_name;
			} else {
				user.name = user.username;
			}
			req.session.user = user;
			req.session.session_id = data.meta.session_id;
			res.redirect('/');
		} else {
			logger.info("Update user error: " + data.meta.message);
			res.render('update', {message: data.meta.message});
		}
	}, req, res);
}

function logout(req, res) {
	console.log("logout");
	ACS.Users.logout(function(data) {
		logger.debug("######logout######");
		logger.debug(JSON.stringify(data, null, 2));
		if(data.success) {
			console.log("go to index");
			delete req.session.user;
			res.redirect('/');
		} else {
			logger.info("Logout error: " + data.message);
			res.render('/', {message: data.message});
		}
	}, req, res);
}

function searchAllUsers(req, res) {
	ACS.Users.search({}, function(e) {
		res.send(e.users);
	});
}