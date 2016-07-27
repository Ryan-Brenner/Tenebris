
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/vendor', express.static(__dirname + '/bower_components'));
// app.use(express.static(__dirname+'/views'));

var controllers = require('./controllers');

/**********
 * ROUTES *
 **********/
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/recentLogs', function viewAllLogs (req,res) {

	res.sendFile(__dirname + '/views/recentLogs.html');


});

app.get('/tagnewloc', function createNewLoc (req,res) {

	res.sendFile(__dirname + '/views/newtag.html');

});


app.get('/issLive', function getStrem (req,res){ 

	res.sendFile(__dirname + '/views/issLive.html');

})




app.get('/geopos', function getPos (req,res) {
	res.send(console.log(res))
});











/**********
 * Endpoints *
 **********/

// app.get('/', controllers.homeController.setApod);
app.get('/api', controllers.api.index);
app.get('/astrologs', controllers.astroLogs.index);
app.post('/astrologs', controllers.astroLogs.create);
app.get('/geopos', controllers.geopos.index);
app.delete('/astrologs/:id', controllers.astroLogs.destroy);







app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
