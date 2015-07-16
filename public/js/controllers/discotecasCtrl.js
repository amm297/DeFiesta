angular.module('app').controller("discotecasCtrl", function($http){

				var disco = this;

				disco.list = [];


				disco.loadData =  function(){
					url = "/getDiscos";

					$http.get(url)
						.success(function(result){
							disco.list = result;
							console.log(result);
						}).error(function(error){
							console.error(error);
						})
				}

				disco.loadData();


			})