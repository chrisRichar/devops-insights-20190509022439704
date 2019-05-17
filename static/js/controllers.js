
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

var markers = [];

var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -36.8485, lng: 174.7633},
          zoom: 8
        });
        
        	map.addListener('click', function(e) {
        		var i;
		    	for(i = 1; i < markers.length; i++){	//find next available array position
		    		if(markers[i] === null)
		    			break;
	    		}

		    	var coord = {lat: e.latLng.lat, lon: e.latLng.lng};
		    	addMarkers(coord, i);
			});
      }

	function addMarkers(latLng, markerNum){
		var marker = new google.maps.Marker({
          position: {lat: latLng.lat, lng: latLng.lon},
          map: map,
          title: markerNum.toString()
        });
        
        markers[markerNum] = marker;
	}
	
	function removeMarkers(markerNum){
		markers[markerNum].setMap(null);
		markers[markerNum] = null;
	}

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
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
            	var coords = response.data.coord;
                if(which === 1) {
                    $scope.zip1Weather = response.data.weather;
                    $scope.zip1City = response.data.coord.lat + ',' + response.data.coord.lon; //response.data.coord.lat + "," + response.data.coord.lon;
                    
                    addMarkers(response.data.coord, which);
                    
                } else if(which === 2) {
                    $scope.zip2City = response.data.coord.lat + ',' + response.data.coord.lon;
                    $scope.zip2Weather = response.data.weather;
                    
                    addMarkers(response.data.coord, which);
                } else if(which === 3) {
                    $scope.zip3City = response.data.coord.lat + ',' + response.data.coord.lon;
                    $scope.zip3Weather = response.data.weather;
                    
                    addMarkers(response.data.coord, which);
                } else if(which === 4) {
                    $scope.zip4City = response.data.coord.lat + ',' + response.data.coord.lon;
                    $scope.zip4Weather = response.data.weather;
                    
                    addMarkers(response.data.coord, which);
                } 
            });
        }else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                    
                    removeMarkers(which);
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                    
                    removeMarkers(which);
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                    
                    removeMarkers(which);
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                    
                    removeMarkers(which);
                } 
        }
    };
    
}]);