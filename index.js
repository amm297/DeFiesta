var app = require('express')();
var http = require('http').Server(app);
var conexion = require("./conexion.js");
var bp =  require('body-parser');
var multer = require("multer");
var user = require("./user.js");
var disco = require("./discoteca.js");
var md5 = require("MD5");

var public_routes = {
	'/': 'public/index.html',
	'/register': 'public/register.html'
};

/*
for(var url in public_routes){
	console.log(url);
	console.log(public_routes[url]);
	app.get(url, function(req, res){
		res.sendfile(public_routes[url]);
	});
};*/

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

app.get('/register', function(req, res){
  res.sendfile('public/register.html');
});

app.get('/discotecas', function(req, res){
  res.sendfile('public/dicotecas.html');
});
app.get('/discoteca', function(req, res){
  res.sendfile('public/discoteca.html');
});


app.get('/discotecas/add', function(req, res){
  res.sendfile('public/dicotecasr.html');
});
app.get('/discotecas/:nombre', function(req, res){

  res.sendfile('public/ficha_discoteca.html');
});



app.use(require('express').static(__dirname + '/public'));

app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
app.use(multer());



app.get('/getDiscos', function(req, res){
  	disco.model.getDiscos(function(ress){
  		console.log(ress);
  		res.json(ress);
  	});
});

app.post('/login', function(req, res){
	console.log(req.body);
	//user.model.findOne({email: req.email});
	var email = req.body.email;
	var pass = md5(req.body.pwd);
	user.model.login(email,pass,function(ress){
		console.log(ress);

		if(email == "Admin"){res.send("/discotecas/add");}
		else{res.send("/discotecas");}
		
	},function(ress){
		disco.model.login(email,pass,function(resss){
			console.log(resss);
			res.send("/discoteca");
		});
	});
});


app.post('/register/new', function(req, res){
	user.model.register(req.body,function(ress){
		console.log(ress);
	});	
});


app.post('/register/disco',function(req,res){
	disco.model.register(req.body,function(ress){
		console.log(ress);
	});

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});



