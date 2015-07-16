angular.module('app').factory('access',function($http){
	
	var login = function(user,sc,ec){

		var url = "/login";

		$http.post(url, {email:user.username, pwd:user.password})
		.success(function(result){
			if(sc) sc(result);
		}).error(function(error){
			if(ec) ec(error);
		})
	}

	var register = function(user){


	}

	return {
		login: login
	}


})