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
		});
		
	}
	
	function perUser(){
		$('.collapse').collapse();
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
	
	$(".standing-view-selection").on("click", function(evt){
		var target = evt.target;
		if($(target).hasClass('active')){
			return;
		}
		$(".standing-view-selection .active").removeClass('active');
		$(target).addClass("active");
		$(".allUsers").toggle();
		$(".allGames").toggle();
	});
	
})();


