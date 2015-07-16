angular.module('app', ['ui.router'])
	.config(function($stateProvider,$urlRouterProvider){
			$urlRouterProvider.otherwise("/");

			$stateProvider.state('login',{
				url:"/",
				templateUrl: "templates/login.html",
				controller: "loginCtrl as login"
			})


			.state('discotecas',{
				url:"/discotecas",
				templateUrl: "templates/discotecas.html",
				controller: "discotecasCtrl as disco"
			})




	})

