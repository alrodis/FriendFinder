//pulling in data we want to display on api route
var resultsArray = require("../data/friends.js");

//GET Route to display JSON of all possible friends
module.exports = function (app) {
	app.get("/api/friends", function(req, res) {
		res.json(resultsArray);
	});
}

//POST Route to handle incoming survey results.  This route also handles the compatibility logic
