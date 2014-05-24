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
		res.render('admin');
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