var ACS = require('acs').ACS;
var logger = require('acs').logger;
var sdk = ACS.initACS('tZguppAg3gt9slE84nA7qgM6wxZeDYI1');
var _ = require("lodash");


function createBracket(req, res) {
	var acsJson = {
		"session_id": req.session.session_id,
		"user_id": req.session.user.id,
		"classname" : "bracket",
		"fields" : req.body
	};
	
	findAllUserBrackets(req, res, function(bracket){
		var id;
		console.log(bracket);
		if(bracket){
			id = bracket.id;
		}
		
		if(id){
			console.log("id found", id);
			deleteBracket(req, res, id, function(status){
				ACS.Objects.create(acsJson, function(e) {
					res.send(e.bracket);
				});
			});
		}
		else{
			console.log("id not found");
			ACS.Objects.create(acsJson, function(e) {
				res.send(e.bracket);
			});
		}
	});
}


function findAllUserBrackets(req, res, cb){
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
		classname : 'bracket',
		"session_id": req.session.session_id,
		where: JSON.stringify({user_id: userId }),
	    per_page: 1000
	}, function(e) {
		console.log(e.bracket);
		var bracket;
		if(e.bracket[0]){
			bracket = e.bracket[0];
		}
		if(cb && cb.name !== "callbacks"){
			cb.call(this,bracket);
		}
		else{
			res.send(bracket);
		}
	});
}

function findAllUserBracketsNoId(req, res){
	if(!req.session.user){
		res.redirect('/');
	}
	
	ACS.Objects.query({
		classname : 'bracket',
		"session_id": req.session.session_id,
		per_page: 1000
	}, function(e) {
		res.send(e.bracket);
	});
}

function deleteBracket(req, res, id, cb){
	ACS.Objects.remove({
	    classname: 'bracket',
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

function deleteOldUserBracket(req, res){
	var id = req.body.id;
	ACS.Objects.remove({
	    classname: 'bracket',
		"session_id": req.session.session_id,
	    id: id
	}, function (e) {
	    res.send(e);
	});
}