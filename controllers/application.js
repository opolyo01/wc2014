var Game = require("../data/groupGames");
var Score = require("./score");
var moment = require("moment");

function index(req, res) {
	res.render('index', {user: req.session.user, games: Game.games, moment: moment});
}

function login(req, res) {
	res.render('login');
}

function admin(req, res) {
	console.log("Admin User", req.session.user.admin);
	if(req.session.user.admin == "true"){
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