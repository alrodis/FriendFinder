var path = require("path");

module.exports = function (app) {
	//GET Route to /survey, which displays the survey page
	app.get("/survey", function(req, res){
		res.sendFile(path.join(__dirname + "/../public/survey.html"));
	});
	//USE Route (default, catch-all), which leads to display the home page
	app.use( function(req, res){
		res.sendFile(path.join(__dirname + "/../public/home.html"));
	});


}