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
	
	findAllUserBrackets(req, res, function(id){
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
	    per_page: 200
	}, function(e) {
		var id;
		if(e.bracket[0] && e.bracket[0].id){
			id = e.bracket[0].id;
		}
		if(cb && cb.name !== "callbacks"){
			cb.call(this,id);
		}
		else{
			res.send(id);
		}
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