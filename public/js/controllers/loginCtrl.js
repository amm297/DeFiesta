angular.module('app').controller("loginCtrl", function($state, access){

				var login = this;

				login.access = function(){
					console.log(login.username+" "+login.password);

					access.login(login, function(data){
						console.log(data)
						$state.go("discotecas");
					});
				}

			})