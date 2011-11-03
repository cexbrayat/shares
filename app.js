
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

// la liste des actions
var shares = [{name:"Google",price:120}, {name:"Apple",price:132}, {name:"Microsoft",price:92}];

// une route simple
app.get('/', function(req, res){
  res.render('shares', {title : 'Shares', shares : shares});
});

// une route avec parametre
app.get('/:name', function(req, res){
  res.render('shares', {title : req.params.name, 
	shares : shares.filter(function(share){return share.name.toLowerCase() == req.params.name.toLowerCase()})});
});

app.listen(process.env.C9_PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
