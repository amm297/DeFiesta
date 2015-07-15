var mongoose = require('mongoose');
var md5 = require('MD5');
var uid = require('rand-token').uid;

var discoSchema =  new mongoose.Schema({
	nombre: {type: String, index: {unique: true, dropDups: true}},
	password: String,
	 auth: {
    	exp_date: {type: Date},
    	token: {type: String, index: {unique: true}},
    	disco: Boolean
    }
});

discoSchema.statics.login = function(email,pass,success_callback){

	this.findOne({nombre: email}).where("password").equals(pass).exec(function(err,res){

		//res =  null -> no hay usuario
		if(err){	
			console.log(err);
		}
		else{
			if(res){
				if(success_callback){
					res.auth.token = uid(16);
					var date = new Date();
					var month  = date.getMonth();
					if(month == 11) month = 0;
					else{ month++;}
					date.setMonth(month);
					res.auth.exp_date = date;
					success_callback(res);	
				} 
			}
			else{
				console.log("No hay usuario"+res);
			}
		}

	});

}

discoSchema.statics.register = function(obj,success_callback){
	obj.password = md5(obj.password);

	var new_disco =  this(obj);
	new_disco.auth.disco = true;
	new_disco.auth.token = uid(16);
	new_disco.save(function(err,res){
		if(err) console.log(err);
		else{
			if(success_callback) success_callback(res);
		}
	});
}


discoSchema.statics.getDiscos = function(success_callback){
	this.find({}, function(err, docs) {
    if (!err){ 
    	var names = new Array();
    	docs.forEach(function(disc){
    		names.push(disc.nombre); 
    	});
        success_callback(names);
    } else {console.log(err);}
});
}

var Disco = mongoose.model('Disco',discoSchema);

module.exports = {
	model: Disco
}