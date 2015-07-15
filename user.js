
var mongoose = require('mongoose');
var md5 = require('MD5');
var uid = require('rand-token').uid;

var userSchema = mongoose.Schema({
    nombreu:{type: String, index: {unique: true, dropDups: true}},
    nombre: String,
    apellidos: String,
    edad:Number,
    email: {type: String, index: {unique: true, dropDups: true}},
    password: String,
    sexo: String,
    auth: {
    	exp_date: {type: Date},
    	token: {type: String, index: {unique: true}},
    	disco: Boolean
    }
});

userSchema.statics.login = function(email,pass,success_callback,error_callback){

	this.findOne({nombreu: email}).where("password").equals(pass).exec(function(err,res){

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
				if(error_callback) error_callback(res);
				
			}
		}

	});

}

userSchema.statics.register = function(obj,success_callback){
	console.log(obj.password);
	obj.password = md5(obj.password);

	var new_user =  this(obj);
	new_user.auth.disco = false;
	new_user.save(function(err,res){
		if(err) console.log(err);
		else{
			if(success_callback) success_callback(res);
		}
	});
}

userSchema.statics.getCurrentUser= function(id,success_callback){
	this.findOne({nombreu: id}).exec(function(err,res){

		//res =  null -> no hay usuario
		if(err){

		}
		else{
			if(res){

			}
			else{

			}
		}

	});

}

//Funciones que se aplican a nivel de objeto
userSchema.methods.cambiarPass =  function(pass, success_callback){
	this.password = md5(pass);
	this.save(function(err,res){
		if(err) 
		if(success_callback) success_callback(res);
	});
}

var User = mongoose.model('User', userSchema);

module.exports = {
	model: User
};
