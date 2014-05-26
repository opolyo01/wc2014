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

var allTeams = ["BRA", "CRO", "CAM", "MEX","SPA", "NET", "CHI", "AUS",
	"COL", "JAP", "GRE", "COT", "URU", "ITA", "COS", "ENG", "SWI", "HON", 
	"ECU", "FRA", "ARG", "NIG", "BOS", "IRA", "GER", "USA", "POR", "GHA",
	"BEL", "KOR", "ALG", "RUS"].sort();
	
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	$.fn.editable.defaults.mode = 'inline';
	$.fn.editable.defaults.showbuttons = false;
	allTeams.unshift("Select");
	_.each(groups, function(group){
		group.unshift("Select");
	});
}


$(".winner").editable({
	source: allTeams,
    type: "select",
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
	var target = evt.target;
	if($(target).hasClass('active')){
		return;
	}
	$(".breadcrumb .active").removeClass('active');
	$(target).addClass("active");
	$(".playoffs-content").toggle();
	$(".group-games-content").toggle();
});

$(".submitResults.playoffGames").on("click", function(){
	var quaterOne = $("#quaterOne").html(),
		quarterTwo = $("#quarterTwo").html(),
		quarterThree = $("#quarterThree").html(),
		quarterFour = $("#quarterFour").html(),
		quarterFive = $("#quarterFive").html(),
		quarterSix = $("#quarterSix").html(),
		quarterSeven = $("#quarterSeven").html(),
		quarterEight = $("#quarterEight").html(),
		semiOne = $("#semiOne").html(),
		semiTwo = $("#semiTwo").html(),
		semiThree = $("#semiThree").html(),
		semiFour = $("#semiFour").html(),
		finalOne = $("#finalOne").html(),
		finalTwo = $("#finalTwo").html(),
		champion = $("#champion").html();
	var bracket = {
		"quarterfinals": [quaterOne, quarterTwo, quarterThree, 
						quarterFour, quarterFive, quarterSix,quarterSeven,quarterEight],
		"semifinals": [semiOne, semiTwo, semiThree, semiFour],
		"finals": [finalOne, finalTwo],
		"champion": champion
	};
	$.post("/createBracket", bracket, function(json) {
		if(json.length === 1){
			alert("Playoff scores committed");
		}
		else{
			alert("Playoff scores commit failed");
		}
	});
});


$(".submitResults.groupGames").on("click", function(){
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