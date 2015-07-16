angular.module('app').controller("registerCtrl", function(access){

				var register = this;

				login.access = function(){
					console.log(login.username+" "+login.password);

					access.login(login, function(data){
						console.log(data)
						document.location=data;
					});
				}

			})