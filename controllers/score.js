var ACS = require('acs').ACS;
var logger = require('acs').logger;
var sdk = ACS.initACS('tZguppAg3gt9slE84nA7qgM6wxZeDYI1');
var _ = require("lodash");


function commitScores(req, res) {
	var scores = req.body.scores;
	_.each(scores, function(score){
		var gameId = score.gameId;
		
		findScoreByGameId(req, res, gameId, function(id){
			if(id){
				console.log("id found", id);
				deleteScore(req, res, id, function(status){
					createScore(req, res, score);
				});
			}
			else{
				console.log("id not found");
				createScore(req, res, score);
			}
		});
		
	});
}

function createScore(req, res, score){
	console.log(score);
	var acsJson = {
		"session_id": req.session.session_id,
		"user_id": req.session.user.id,
		"classname" : "score",
		"fields" : score
	};
	ACS.Objects.create(acsJson, function(e) {
		res.send(e.score);
	});
}

function findScoreByGameId(req, res, gameId, cb){
	console.log(req.session.user.id, gameId);
	ACS.Objects.query({
		classname : 'score',
		"session_id": req.session.session_id,
		where: JSON.stringify({user_id: req.session.user.id, gameId: gameId }),
	    per_page: 200
	}, function(e) {
		var id;
		if(e.score[0] && e.score[0].id){
			id = e.score[0].id;
		}
		
		if(cb && cb.name !== "callbacks"){
			cb.call(this,id);
		}
		else{
			res.send(id);
		}
		
	});
}

function findAllUserScores(req, res){
	if(!req.session.user){
		res.redirect('/');
		return;
	}
	var userId =  req.session.user.id;
	if(req.query.userId){
		userId = req.query.userId;
	}
	console.log(userId);
	ACS.Objects.query({
		classname : 'score',
		"session_id": req.session.session_id,
		where: JSON.stringify({user_id: userId }),
	    per_page: 200
	}, function(e) {
		res.send(e.score);
	});
}


function deleteScore(req, res, id, cb){
	ACS.Objects.remove({
	    classname: 'score',
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

function deleteOldUserScore(req, res){
	var id = req.body.id;
	ACS.Objects.remove({
	    classname: 'score',
		"session_id": req.session.session_id,
	    id: id
	}, function (e) {
	    res.send(e);
	});
}