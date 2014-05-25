var groups = {
	"A": ["BRA", "CRO", "CAM", "MEX"],
	"B": ["SPA", "NET", "CHI", "AUS"],
	"C": ["COL", "JAP", "GRE", "COT"],
	"D": ["URU", "ITA", "COS", "ENG"],
	"E": ["SWI", "HON", "ECU", "FRA"],
	"F": ["ARG", "NIG", "BOS", "IRA"],
	"G": ["GER", "USA", "POR", "GHA"],
	"H": ["BEL", "KOR", "ALG", "RUS"]
};

$(".winner").editable({
	title: "Winner"
});

$('#oneA').editable({
    source: groups["A"],
    type: "select",
    title: "Winner Group A",
    success: function(response, newValue) {
    	console.log(newValue);
    }
});

$('#twoB').editable({
    source: groups["B"],
    type: "select",
    title:"Second Group B"
});
$('#oneC').editable({
    source: groups["C"],
    type: "select",
    title: "Winner Group C"
});

$('#twoD').editable({
    source: groups["D"],
    type: "select",
    title: "Second Group D"
});
$('#oneE').editable({
    source: groups["E"],
    type: "select",
    title: "Winner Group E"
});

$('#twoF').editable({
    source: groups["F"],
    type: "select",
    title: "Second Group F"
});


$('#oneG').editable({
    source: groups["G"],
    type: "select",
    title: "Winner Group G"
});

$('#twoH').editable({
    source: groups["H"],
    type: "select",
    title: "Second Group H"
});
$('#oneB').editable({
    source: groups["B"],
    type: "select",
    title: "Winner Group B"
});

$('#twoA').editable({
    source: groups["A"],
    type: "select",
    title: "Second Group A"
});
$('#oneD').editable({
    source: groups["D"],
    type: "select",
    title: "Winner Group D"
});

$('#twoC').editable({
    source: groups["C"],
    type: "select",
    title: "Second Group C"
});


$('#oneF').editable({
    source: groups["F"],
    type: "select",
    title: "Winner Group F"
});

$('#twoE').editable({
    source: groups["E"],
    type: "select",
    title: "Second Group E"
});
$('#oneH').editable({
    source: groups["H"],
    type: "select",
    title: "Winner Group H"
});

$('#twoG').editable({
    source: groups["G"],
    type: "select",
    title: "Second Group G"
});

$(".team").tooltip();
$.get("/findAllUserScores", {}, function(scores) {
	var scoreOne, scoreTwo, $score;
	_.each(scores, function(score, key){
		if(score){
			$score = $(".games").find("[data-gameId='" + score.gameId + "']");
			scoreOne = $score.find(".scoreOne").val(score.teamOne);
			scoreTwo = $score.find(".scoreTwo").val(score.teamTwo);
		}
	});
});

$(".breadcrumb").on("click", function(evt){
	$(".breadcrumb .active").removeClass('active');
	$(this).addClass("active");
	$(".playoffs-content").toggle();
	$(".group-games-content").toggle();
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