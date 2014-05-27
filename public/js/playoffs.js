(function(){
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
	
	$.get("/findAllUserBrackets", {}, function(brackets) {
		
		if(_.isEmpty(brackets)){
			return;
		}
		
		var champion = brackets.champion.champion;
		
		var finalOne = _.find(brackets.finals, "finalOne").finalOne,
			finalTwo = _.find(brackets.finals, "finalTwo").finalTwo;
			
		var semiOne = _.find(brackets.semifinals, "semiOne").semiOne,
			semiTwo = _.find(brackets.semifinals, "semiTwo").semiTwo,
			semiThree = _.find(brackets.semifinals, "semiThree").semiThree,
			semiFour = _.find(brackets.semifinals, "semiFour").semiFour;
			
		var quaterOne = _.find(brackets.quarterfinals, "quaterOne").quaterOne,
			quarterTwo = _.find(brackets.quarterfinals, "quarterTwo").quarterTwo,
			quarterThree = _.find(brackets.quarterfinals, "quarterThree").quarterThree,
			quarterFour = _.find(brackets.quarterfinals, "quarterFour").quarterFour,
			quarterFive = _.find(brackets.quarterfinals, "quarterFive").quarterFive,
			quarterSix = _.find(brackets.quarterfinals, "quarterSix").quarterSix,
			quarterSeven = _.find(brackets.quarterfinals, "quarterSeven").quarterSeven,
			quarterEight = _.find(brackets.quarterfinals, "quarterEight").quarterEight;
			
		var oneA = _.find(brackets.oneEighths, "oneA").oneA,
			twoB = _.find(brackets.oneEighths, "twoB").twoB,
			oneC = _.find(brackets.oneEighths, "oneC").oneC,
			twoD = _.find(brackets.oneEighths, "twoD").twoD,
			oneE = _.find(brackets.oneEighths, "oneE").oneE,
			twoF = _.find(brackets.oneEighths, "twoF").twoF,
			oneG = _.find(brackets.oneEighths, "oneG").oneG,
			twoH = _.find(brackets.oneEighths, "twoH").twoH,
			oneB = _.find(brackets.oneEighths, "oneB").oneB,
			twoA = _.find(brackets.oneEighths, "twoA").twoA,
			oneD = _.find(brackets.oneEighths, "oneD").oneD,
			twoC = _.find(brackets.oneEighths, "twoC").twoC,
			oneF = _.find(brackets.oneEighths, "oneF").oneF,
			twoE = _.find(brackets.oneEighths, "twoE").twoE,
			oneH = _.find(brackets.oneEighths, "oneH").oneH,
			twoG = _.find(brackets.oneEighths, "twoG").twoG;
			
			
		$("#champion").html(champion);
		$("#finalOne").html(finalOne);
		$("#finalTwo").html(finalTwo);
		$("#semiOne").html(semiOne);
		$("#semiTwo").html(semiTwo);
		$("#semiThree").html(semiThree);
		$("#semiFour").html(semiFour);
		$("#quaterOne").html(quaterOne);
		$("#quarterTwo").html(quarterTwo);
		$("#quarterThree").html(quarterThree);
		$("#quarterFour").html(quarterFour);
		$("#quarterFive").html(quarterFive);
		$("#quarterSix").html(quarterSix);
		$("#quarterSeven").html(quarterSeven);
		$("#quarterEight").html(quarterEight);
		
		$('#oneA').html(oneA);
		$('#twoB').html(twoB);
		$('#oneC').html(oneC);
		$('#twoD').html(twoD);
		$('#oneE').html(oneE);
		$('#twoF').html(twoF);
		$('#oneG').html(oneG);
		$('#twoH').html(twoH);
		$('#oneB').html(oneB);
		$('#twoA').html(twoA);
		$('#oneD').html(oneD);
		$('#twoC').html(twoC);
		$('#oneF').html(oneF);
		$('#twoE').html(twoE);
		$('#oneH').html(oneH);
		$('#twoG').html(twoG);
		
	});
	
	$(".submitResults.playoffGames").on("click", function(){
		var oneA = $('#oneA').html(),
			twoB = $('#twoB').html(),
			oneC = $('#oneC').html(),
			twoD = $('#twoD').html(),
			oneE = $('#oneE').html(),
			twoF = $('#twoF').html(),
			oneG = $('#oneG').html(),
			twoH = $('#twoH').html(),
			oneB = $('#oneB').html(),
			twoA = $('#twoA').html(),
			oneD = $('#oneD').html(),
			twoC = $('#twoC').html(),
			oneF = $('#oneF').html(),
			twoE = $('#twoE').html(),
			oneH = $('#oneH').html(),
			twoG = $('#twoG').html(),
			quaterOne = $("#quaterOne").html(),
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
			"oneEighths": [{"oneA": oneA}, {"twoB" : twoB}, {"oneC": oneC}, 
							{"twoD":twoD}, {"oneE":oneE}, 
							{"twoF":twoF},{"oneG":oneG},{"twoH": twoH},
							{"oneB": oneB}, {"twoA" : twoA}, {"oneD": oneD}, 
							{"twoC":twoC}, {"oneF":oneF}, 
							{"twoE":twoE},{"oneH":oneH},{"twoG": twoG}],
			"quarterfinals": [{"quaterOne": quaterOne}, {"quarterTwo" : quarterTwo}, {"quarterThree": quarterThree}, 
							{"quarterFour":quarterFour}, {"quarterFive":quarterFive}, 
							{"quarterSix":quarterSix},{"quarterSeven":quarterSeven},{"quarterEight": quarterEight}],
			"semifinals": [{"semiOne":semiOne}, {"semiTwo":semiTwo}, {"semiThree":semiThree}, {"semiFour":semiFour}],
			"finals": [{"finalOne":finalOne}, {"finalTwo":finalTwo}],
			"champion": {"champion":champion}
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
})();