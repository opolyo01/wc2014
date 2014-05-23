$.get("/findAllUserScores", {}, function(scores) {
	var scoreOne, scoreTwo, $score;
	_.each(scores, function(score, key){
		console.log(score, key);
		if(score){
			$score = $(".games").find("[data-gameId='" + score.gameId + "']");
			scoreOne = $score.find(".scoreOne").val(score.teamOne);
			scoreTwo = $score.find(".scoreTwo").val(score.teamTwo);
		}
	});
});



$(".submitResults").on("click", function(){
	var arr = [], hs = {};
	var scoreOne, scoreTwo;
	var scores = $(".score");
	var gameId;
	_.each(scores, function(score){
		var $score = $(score);
		gameId = $score.data().gameid;
		scoreOne = $score.find(".scoreOne").val();
		scoreTwo = $score.find(".scoreTwo").val();
		arr.push({
			"gameId": gameId,
			"teamOne": scoreOne,
			"teamTwo": scoreTwo
		});
	});
	
	$.post("/commitScores", {"scores": arr}, function(json) {
		if(json.length === 1){
			alert("Scores committed");
		}
		else{
			alert("Scores commit failed");
		}
	});
});