var ACS = require('acs').ACS;
var logger = require('acs').logger;
var sdk = ACS.initACS('tZguppAg3gt9slE84nA7qgM6wxZeDYI1');

function commitScores(req, res) {
	findScores(req, res, function(score){
		var id;
		if(score[0]){
			id = score[0].id;
		}
		
		var acsJson = {
			"session_id": req.session.session_id,
			"classname" : "score",
			"fields" : {"scores": req.body}
		};
		if(!id){
			console.log("create");
			ACS.Objects.create(acsJson, function(e) {
				res.send(e.score[0].scores);
			});	
		}
		else{
			acsJson = {
				id: id,
				"session_id": req.session.session_id,
				"classname" : "score",
				"fields" : {"scores": req.body}
			};
			ACS.Objects.update(acsJson, function(e) {
				console.log(e);
				res.send(e);
			});	
		}
	});
	
}

function findScores(req, res, cb){
	ACS.Objects.query({
		classname : 'score',
		"session_id": req.session.session_id,
		where: JSON.stringify({user_id: req.session.user.id }),
	    per_page: 200
	}, function(e) {
		if(cb){
			if(cb.name !== "callbacks"){
				cb.call(this, e.score);
			}
			else{
				if(e.score.length > 0){
					res.send(e.score[0].scores);
				}
				else{
					res.send([]);
				}
			}
		}
		else{
			res.send(e.score[0].scores);
		}
		
	});
}
