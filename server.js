var 
	  express = require('express')
	, http    = require('http')
	, route   = require('./route')
	, user    = require('./route/user')
;
	

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/view');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(express.favicon());

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', route.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
	console.log('org-janux server listening on port ' + app.get('port'));
});
