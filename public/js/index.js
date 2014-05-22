$.get("/findScores", {}, function(scores) {
	var scoreOne, scoreTwo, $score;
	_.each(scores, function(score, key){
		console.log(score, key);
		if(score.length === 2){
			$score = $(".games").find("[data-gameId='" + key + "']");
			scoreOne = $score.find(".scoreOne").val(score[0]);
			scoreTwo = $score.find(".scoreTwo").val(score[1]);
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
		hs[gameId] = [scoreOne, scoreTwo];
	});
	
	$.post("/commitScores", hs, function(json) {
		if(json.success){
			alert("Scores committed");
		}
		else{
			alert("Scores commit failed");
		}
		console.log(json);
	});
});