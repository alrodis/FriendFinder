//pulling in data we want to display on api route
var friendsArray = require("../data/friends.js");

//ROUTING
//GET Route to display JSON of all possible friends
module.exports = function (app) {
	app.get("/api/friends", function(req, res) {
		res.json(friendsArray);
	});


//POST Route to handle incoming survey results.  This route also handles the compatibility logic
	app.post("/api/friends", function(req, res){
		var receivedResults = req.body;
		console.log(receivedResults);//console logging in terminal, grabbng user input data from survey

		var surveyScores = receivedResults['scores[]']
		console.log("Survey Scores before parseInt: "+ surveyScores);
		
		for (var i = 0; i < surveyScores.length; i++) {
			surveyScores[i] = parseInt(surveyScores[i])
		};

		console.log("Survey Scores after parseInt: " + surveyScores);
		
		for (var i = 0; i < friendsArray.length; i++) {
			var friendRecordScores = friendsArray[i].scores
			console.log("Database scores: " + friendRecordScores);
			console.log("Survey Score: " + surveyScores);
			//works up thru here^^
			var totalDifference = 0
			for (var i = 0; i < 10; i++) {
				totalDifference += Math.abs(friendRecordScores[i] - surveyScores[i])
			};

			console.log(totalDifference)
		};



		friendsArray.push(req.body);
		res.json(receivedResults);
	});
};

