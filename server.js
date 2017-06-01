
// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MongoDB

 mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:password@ds133231.mlab.com:33231/mctwisp');
// mongoose.connection.on('error', function(){});

// Express
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes`````````````````````````````````````````````````````````````````````````````````````````
app.use('/api', require('./routes/api'));

// Start server
/*version 1 debug
var port = process.env.port || 5000
, ip = process.env.ip || "0.0.0.0";
app.listen(port, ip, function() {
  console.log('Express server listening on %d', port);
});
*/

app.listen(process.env.PORT || 5000, function () {
  console.log('Express server listening on %d', process.env.PORT);
});
