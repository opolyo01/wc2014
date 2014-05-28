var Game = require("../data/groupGames");
var Score = require("./score");
var moment = require("moment");
var _ = require("lodash");

function index(req, res) {
	console.log(req.body);	
	res.render('index', {user: req.session.user, games: Game.games, moment: moment});
}

function login(req, res) {
	index(req, res);
}

function admin(req, res) {
	console.log("user", req.session.user);
	
	if(_.isEmpty(req.session.user)){
		console.log("here");
		index(req, res);
	}
	else if(req.session.user.admin == "true"){
		console.log("in admin page");
		res.render('admin', {user: req.session.user});
	}
	else{
		res.render('login');
	}
}

function update(req, res) {
	res.render('update');
}

function signup(req, res) {
	res.render('signup');
}

function chatroom(req, res) {
	if(_.isEmpty(req.session.user)){
		index(req, res);
	}
	else{
		res.render('chatroom', {user: req.session.user});
	}
    
}

function settings(req, res) {
	if(_.isEmpty(req.session.user)){
		console.log("setting...");
		index(req, res);
	}
	else{
		res.render('settings', {user: req.session.user});
	}
    
}