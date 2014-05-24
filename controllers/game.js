var ACS = require('acs').ACS;
var logger = require('acs').logger;
var sdk = ACS.initACS('tZguppAg3gt9slE84nA7qgM6wxZeDYI1');
var _ = require("lodash");
var Game = require("../data/groupGames");

function getAllGames(req, res){
	ACS.Objects.query({
		classname : 'game',
		"session_id": req.session.session_id
	}, function(e) {
		res.send(e.game);
	});
}


function commitGames(req, res) {
	var games = Game.games;
	_.each(games, function(game){
		var gameId = game.gameId;
		
		findGame(req, res, gameId, function(id){
			if(id){
				deleteGame(req, res, id, function(status){
					createGame(req, res, game);
				});
			}
			else{
				createGame(req, res, game);
			}
		});
		
	});
}

function deleteGame(req, res, id, cb){
	ACS.Objects.remove({
	    classname: 'game',
		"session_id": req.session.session_id,
	    id: id
	}, function (e) {
	    if(cb && cb.name !== "callbacks"){
			cb.call(this,e);
		}
		else{
			res.send(e);
		}
	});
}

function createGame(req, res, game){
	var acsJson = {
		"session_id": req.session.session_id,
		"classname" : "game",
		"fields" : game
	};
	ACS.Objects.create(acsJson, function(e) {
		res.send(e.game);
	});
}

function findGame(req, res, gameId, cb){
	ACS.Objects.query({
		classname : 'game',
		"session_id": req.session.session_id,
		where: JSON.stringify({gameId: gameId }),
	    per_page: 200
	}, function(e) {
		var id;
		if(e.game[0] && e.game[0].id){
			id = e.game[0].id;
		}
		
		if(cb && cb.name !== "callbacks"){
			cb.call(this,id);
		}
		else{
			res.send(id);
		}
		
	});
}