"use strict";

var app = angular.module("SSC", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("home", {url: "/", templateUrl: "/partials/home.html", controller: "homeCtrl"})
    .state("register", {url: "/register", templateUrl: "/partials/register.html", controller: "registerCtrl"})
    .state("login", {url: "/login", templateUrl: "/partials/login.html", controller: "loginCtrl"})


  $urlRouterProvider.otherwise("/");
});

app.controller("homeCtrl", function(){
  console.log("homeCtrl");
});

app.controller("loginCtrl", function($scope, $http){
  console.log("loginCtrl");

  $scope.doLogin = function(){
    console.log("$scope.email", $scope.email);
    console.log("$scope.password", $scope.password);
    var userData = { email: $scope.email, password: $scope.password };
    console.log("userData", userData);

    $.post({
      url: "/users/login",
      data: userData
    })
    .success(function(data){
      console.log("Success data:", data);
    })
    .fail(function(err){
      console.error("post:", err);
    });
  }
    // $http.post("/users/login", { email: $scope.email, password: $scope.password})
    //   .then(function(data){
    //     console.log(data);
    //   }, function(err){
    //     console.error(err);
    //   });

});

app.controller("registerCtrl", function($scope, $http){
  console.log("registerCtrl");

  $scope.doRegister = function(){
    var userData = { email: $scope.email, password: $scope.password, username: $scope.username };

    if ($scope.password === $scope.password2){
      $http.post("/users/register", userData)
        .then(function(data){
          console.log(data);
        }, function(err){
          console.error(err);
        });
    } else {
      swal("Your passwords must match.", "", "error");
      $scope.password = "";
      $scope.password2 = "";
    }
  }
});
