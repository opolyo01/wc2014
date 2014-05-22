var ACS = require('acs').ACS;
var logger = require('acs').logger;
var sdk = ACS.initACS('tZguppAg3gt9slE84nA7qgM6wxZeDYI1');

function getAllGames(req, res){
	ACS.Objects.query({
		classname : 'game',
		"session_id": req.session.session_id
	}, function(e) {
		//console.log(e);
		res.send(e.game[0].games);
	});
}


function updateGames(req, res){
	//console.log(req.body);
	var games = [{
		"teamOne": "Brasil",
		"scoreOne": "",
		"teamTwo": "Croatia",
		"scoreTwo": "",
	},{
		"teamOne": "Russia",
		"scoreOne": "",
		"teamTwo": "Belgium",
		"scoreTwo": "",
	}];
	ACS.Objects.update({
		classname: 'game',
		"session_id": req.session.session_id,
		id: "537c4b0c2c2e99082b06b195",
	    fields: games
	}, function (e) {
		console.log(e);
	    if (e.success) {
	    	res.send({status: "success"});
	    } 
	    else {
	        res.send({status: "failure"});
	    }
	});
}