var express = require('express');
var path = require('path');
var router = express.Router();
var friendsList = require('../data/friends.js');

/*middleware: Server timelog*/
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

/*calculate survey differences*/
router.post('/api/friends', function(req, res) {
	let newSurvey = req.body;
	let pickedFriend;
	let friendCalc = [];

/*run through different scores and get calculation for each score difference. add each scoreDiff to get total score difference.*/
	for (var i = 0; i < friendsList.length; i++) {
        var totalDifference = 0;
        for (var k = 0; k < 10; k++) {
            let scoreDiff = Math.abs(friendsList[i].scores[k] - newSurvey.scores[k]);
            totalDifference += scoreDiff;
        }
/*push each friend with the Total Difference calculation into friendCalc*/
		friendCalc.push({
			name: friendsList[i].name,
			picture: friendsList[i].picture,
			totalDiff: totalDifference
		});
	}
/*run through object and compare each totalDiff if its lower than the max score replace max score with that number until we have the lowest max score saved*/
	let maxScore = 40;
	friendCalc.map(function(obj) {
		if (obj.totalDiff < maxScore) maxScore = obj.totalDiff;
	});
/*once the lowest max score is found then return the user that matches the score*/
	pickedFriend = friendCalc.filter(function(e) {
		return e.totalDiff == maxScore;
	});
	res.json(pickedFriend);
	friendsList.push(newSurvey);

});

router.get('/api/friends', function(req, res) {
	res.json(friendsList);
});

module.exports = router;