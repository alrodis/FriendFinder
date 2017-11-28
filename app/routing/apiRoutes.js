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
		//creating blank object variable to push into frontend after compatibility calculation
		var perfectMatch = {
			name: "",
			photo: "",
			perfectMatchDifference: 1000
		}
		var receivedResults = req.body;
		console.log(receivedResults);//console logging in terminal, grabbng user input data from survey

		//the variable surveyScores is grabbing just the score array from the user input survey answers 
		var surveyScores = receivedResults['scores[]']
		console.log("Survey Scores before parseInt: "+ surveyScores);
		
		//looping through the user input survey scores to convert numbers from strings to integer so calculaion can be done
		for (var i = 0; i < surveyScores.length; i++) {
			surveyScores[i] = parseInt(surveyScores[i])
		};

		console.log("Survey Scores after parseInt: " + surveyScores);
		
		//looping through friends array (the "database")
		for (var i = 0; i < (friendsArray.length -1); i++) {
			//creating new variable to grab just the score array from the database objects
			var friendRecordScores = friendsArray[i].scores
			console.log("Database scores: " + friendRecordScores);
			console.log("Survey Score: " + surveyScores);
			
			var totalDifference = 0
			//looping through 10 questions from survey scores to do calculation as outlined in the homework requirements
			for (var i = 0; i < 10; i++) {
				//using Math.abs to calculate absolute value of differences (no negative numbers)
				totalDifference += Math.abs(friendRecordScores[i] - surveyScores[i])
				//loop within a loop to build the perfectMatch object, which was created as a blank object, above
				if (totalDifference <= perfectMatch.perfectMatchDifference) {
					perfectMatch.name = friendsArray[i].name;
					perfectMatch.photo = friendsArray[i].photo;
					perfectMatch.perfectMatchDifference = totalDifference
				};
			};


			console.log(totalDifference)

		};



		friendsArray.push(req.body);
		res.json(perfectMatch);
	});
};

