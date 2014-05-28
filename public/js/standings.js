(function(){
	var users = [];
	var allUserNames = [];
	Handlebars.registerHelper('gameTeamOne', function(gameId) {
		 return _.find(games, function(game){return game.gameId == gameId;}).teamOne;
	});
	
	Handlebars.registerHelper('gameTeamTwo', function(gameId) {
		 return _.find(games, function(game){return game.gameId == gameId;}).teamTwo;
	});
	
	Handlebars.registerHelper('formatTeam', function(name) {
		 return name.substring(0, 3).toUpperCase();
	});
	
	Handlebars.registerHelper('evenOdd', function(idx) {
		 return idx % 2 === 0 ? "even" : "odd";
	});
	init();
	
	function init(){
		$(".allUsers").hide();
		$.get("/findAllUserScoresNoId", {}, function(scores) {
			
			_.each(scores, function(score){allUserNames.push(score.user.username);});
			allUserNames = _.uniq(allUserNames);
			
			_.each(allUserNames, function(username){
				var userScores = _.filter(scores, function(score){
					if(score.user.username == username) {
						return score;
					}
				});
				users.push({"username": username, "scores": userScores});
			});
			perGame();
			perUser();
			playoffs();
		});
		
	}
	
	function perUser(){
		var source = $("#allUsersTemplate").html();
		var template = Handlebars.compile(source);
		var html = template({"users": users});
		$(".allUsers").html(html);
	}
	
	function perGame(){
		var source = $("#allGamesTemplate").html();
		var template = Handlebars.compile(source);
		var html = template({"games": games, "users": users});
		$(".allGames").html(html);
	}
	
	function playoffs(){
		var source = $("#playoffGamesTemplate").html();
		var template = Handlebars.compile(source);
		var bracketsArr = [];
		
		$.get("/findAllUserBracketsNoId", {}, function(brackets) {
			_.each(allUserNames, function(username){
				_.each(brackets, function(bracket){
					if(!_.isEmpty(bracket.user) && bracket.user.username == username){
						var quarterfinals = [],
							semifinals = [],
							finals = [],
							champion = bracket.champion.champion;
						
						_.each(bracket.quarterfinals, function(q){
							var key = Object.keys(q)[0]; 
							quarterfinals.push(q[key]);
						});
						_.each(bracket.semifinals, function(q){
							var key = Object.keys(q)[0]; 
							semifinals.push(q[key]);
						});
						_.each(bracket.finals, function(q){
							var key = Object.keys(q)[0]; 
							finals.push(q[key]);
						});
						bracketsArr.push({"username": username, "quarterfinals": quarterfinals, 
							"semifinals": semifinals, "finals": finals});
					}
				});
				
			});
			
			console.log(bracketsArr);
			var html = template({"brackets": bracketsArr});
			$(".playoffGamesStanding").html(html);
		});
	}
	
	$(".standing-view-selection").on("click", function(evt){
		var target = evt.target;
		if($(target).hasClass('active')){
			return;
		}
		$(".standing-view-selection .active").removeClass('active');
		$(target).addClass("active");
		$(".allUsers").hide();
		$(".allGames").hide();
		$(".playoffGamesStanding").hide();
		if($(target).hasClass('perGame')){
			$(".allUsers").show();
		}
		else if($(target).hasClass('perUser')){
			$(".allGames").show();
		}
		else if($(target).hasClass('brackets')){
			$(".playoffGamesStanding").show();
		}
	});
	
})();


