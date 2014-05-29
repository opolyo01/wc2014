var Game = require("../data/groupGames");
var Score = require("./score");
var moment = require("moment");
var _ = require("lodash");

function index(req, res) {
	if(req.session.user){
		res.render('home', {user: req.session.user, games: Game.games, moment: moment});
	}
	else{
		console.log("login");
		res.redirect('login');
	}
	
}

function login(req, res) {
	res.render('login');
}

function admin(req, res) {
	console.log("user", req.session.user);
	
	if(_.isEmpty(req.session.user)){
		res.render('login');
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
		res.render('login');
	}
	else{
		res.render('chatroom', {user: req.session.user});
	}
    
}

function settings(req, res) {
	if(_.isEmpty(req.session.user)){
		res.render('login');
	}
	else{
		res.render('settings', {user: req.session.user});
	}
    
}