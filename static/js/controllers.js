
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.city1 = "";
    $scope.zip1Weather = "";

    $scope.zip = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 

        if(data.length > 1) {
            $http({
                method: "GET",
                url: '/api/v1/getWeather?zip=' + data
            }).then( function(response) {
                if(which === 1) {
                    $scope.city1 = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                } else if(which === 2) {
                    $scope.city2 = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.city3 = response.data.weather;
                } else if(which === 4) {
                    $scope.city4 = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                } 
            });
        }else {
            if(which === 1) {
                    $scope.city1 = "";
                    $scope.zip1Weather = "";
                } else if(which === 2) {
                    $scope.city2 = "";
                    $scope.zip2Weather = "";
                } else if(which === 3) {
                    $scope.city3 = "";
                    $scope.zip3Weather = "";
                } else if(which === 4) {
                    $scope.city4 = "";
                    $scope.zip4Weather = "";
                } 
        }
        
        var count = 1;
        while(count <= 4){
        	
        	
        	count = count + 1;
    	}
    };
    
}]);