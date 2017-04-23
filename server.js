/*Dependencies*/
/*=============================================================*/
var express = require('express');
var bodyParser = require('body-parser');

/*Sets up express app
================================================================*/
var app = express();
var PORT = process.env.PORT || 3000;

/*Sets up the express app to handle data parsing*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

/*Server begin listening*/
/*========================================================*/
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
});

/*Routes
====================================================================
html Routes*/
require('./app/routing/htmlRoutes.js')(app);
/*api routes*/
require('./app/routing/apiRoutes.js')(app);