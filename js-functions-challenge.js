var gameInfo = function(){
  return [
   {
     home_team: "Patriots",
     away_team: "Broncos",
     home_score: 7,
     away_score: 3
   },
   {
     home_team: "Broncos",
     away_team: "Colts",
     home_score: 3,
     away_score: 0
   },
   {
     home_team: "Patriots",
     away_team: "Colts",
     home_score: 11,
     away_score: 7
   },
   {
     home_team: "Steelers",
     away_team: "Patriots",
     home_score: 7,
     away_score: 21
   }
 ]
}

// YOUR CODE HERE
var teamConstructor = function(name){
  return {
    name: name,
    rank: 0,
    wins: 0,
    losses: 0,
    details: [],
    addDetails: function(arr){
      this.details = arr;
    },
    wins_game: function(){
      this.wins += 1;
    },
    loses_game: function(){
      this.losses += 1;
    },
    set_rank: function(num){
      this.rank = num;
    },
    summary: function(){
      console.log("Name: " + this.name);
      console.log("Rank: " + this.rank);
      console.log("Wins: " + this.wins);
      console.log("Losses: " + this.losses);
      console.log("Details:");
      for (var i=0; i<this.details.length; i++){
        console.log(this.details[i]);
      };
    }
  }
};

var teamInfo = function(game){
  var names=[];
  for (var i=0; i<game.length; i++){
    if (names.indexOf(game[i].home_team)<0){
      names.push(game[i].home_team)
    };
    if (names.indexOf(game[i].away_team)<0){
      names.push(game[i].away_team)
    };
  };

  var array=[];
  for (var i=0; i<names.length; i++){
    array.push(teamConstructor(names[i]));
  };
  return array;
};

var findTeam=function(teams, name){
  var team;
  for (var i=0; i<teams.length; i++){
    if (teams[i].name==name){
      team = teams[i];
    }
  }
  return team;
};

var score = function(game){
  var winner;
  var loser;
  for (var i=0; i<game.length; i++){
    if(game[i].home_score > game[i].away_score){
      winner = game[i].home_team
      loser = game[i].away_team
    };
    if(game[i].home_score < game[i].away_score){
      winner = game[i].away_team
      loser = game[i].home_team
    };

    var object;
    object = findTeam(teams, winner);
    object.wins_game();
    object = findTeam(teams, loser);
    object.loses_game();
  };
};

var rank = function(teams){
  teams.sort(function(a, b) {return b.wins - a.wins})
  for (var i=0; i<teams.length; i++){
    teams[i].set_rank(i+1);
  }
};

var teams = teamInfo(gameInfo());
score(gameInfo());
rank(teams);

String.prototype.rightJustify = function( length ) {
    var fill = [];
    while ( fill.length + this.length < length ) {
      fill[fill.length] = " ";
    }
    return this + fill.join('');
};

var leaderboard = function(data, lineWidth){
  console.log("-----------------------------------------------------------".rightJustify(lineWidth));
  console.log("| Name".rightJustify(lineWidth/4)+"Rank".rightJustify(lineWidth/4)+"Total Wins".rightJustify(lineWidth/4)+"Total Losses |".rightJustify(lineWidth/4));
  for (var i=0; i<data.length; i++){
    console.log(("| "+data[i].name).rightJustify(lineWidth/4)+(""+data[i].rank+"").rightJustify(lineWidth/4)+(""+data[i].wins+"").rightJustify(lineWidth/4)+(data[i].losses+"            |").rightJustify(lineWidth/4));
  };
  console.log("-----------------------------------------------------------".rightJustify(lineWidth));
};
leaderboard(teams, 60);

var detailsInfo = function(teams, game){
  for (var i=0; i<teams.length; i++){
    var details = [];
    for (var j=0; j<game.length; j++){
      var opposingTeam;
      var myScore;
      var otherTeamScore;
      if (teams[i].name == game[j].home_team || teams[i].name == game[j].away_team){
        if (teams[i].name == game[j].home_team){
          opposingTeam = game[j].away_team;
          myScore = game[j].home_score;
          otherTeamScore = game[j].away_score;
        } else if (teams[i].name == game[j].away_team){
          opposingTeam = game[j].home_team;
          myScore = game[j].away_score;
          otherTeamScore = game[j].home_score;
        }
        details.push("Opposing Team: " + opposingTeam);
        details.push("Team score: " + myScore);
        details.push("Opposing team's score: " + otherTeamScore);
        details.push("-----------------------------------------------------------");
        details.join("\n");
        teams[i].addDetails(details);
      }
    }
  };
};
detailsInfo(teams, gameInfo());

for (var i=0; i<teams.length; i++){
  teams[i].summary();
};
