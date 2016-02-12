"use strict";

var app = angular.module("SSC", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("home", {url: "/", templateUrl: "/partials/home.html", controller: "homeCtrl"})
    .state("register", {url: "/register", templateUrl: "/partials/register.html", controller: "registerCtrl"})
    .state("login", {url: "/login", templateUrl: "/partials/login.html", controller: "loginCtrl"})
    .state("dash", {url: "/dashboard", templateUrl: "/partials/dashboard.html", controller: "dashCtrl"})
    .state("profile", {url: "/profile", templateUrl: "/partials/profile.html", controller: "profileCtrl"})


  $urlRouterProvider.otherwise("/");
});

app.controller("dashCtrl", function($http, $state){
  $http.post("/users/auth")
    .then(function(userData) {
      console.log("Authorized User");
      console.log("userData:", userData);
      $http.get("/users/dashboard")
        .then(function(dashData) {
          console.log("dashData:", dashData.data);
        },
        function(err) {
          console.error(err);
        }
      )
    },
    function(err) {
      swal("You must be logged in to view the previous page");
      $state.go("login")
    });
  console.log("dashCtrl");
});

app.controller("homeCtrl", function(){
  console.log("homeCtrl");
});

app.controller("loginCtrl", function($scope, $http, $state){
  console.log("loginCtrl");

  $scope.doLogin = function(){
    var userData = { email: $scope.email, password: $scope.password };

    $http.post("/users/login", { email: $scope.email, password: $scope.password})
      .then(function(data){
        $state.go("dash");

      }, function(err){
        console.error(err);
      });
  }

});

app.controller("profileCtrl", function($scope, $http, $state){
  $http.post("/users/auth")
    .then(function(userData) {
      console.log("Authorized User");
      console.log("userData:", userData);
      $http.get("/users/profile")
        .then(function(profileData) {
          var user = profileData.data;
          console.log("user:", user);
          console.log("user.username:", user.username);
          $scope.user = {};
          $scope.user.email = user.email;
          $scope.user.username = user.username;
          $scope.user.gender = user.gender;
          $scope.user.seeking = user.seeking;
          $scope.user.dob = user.dob;
          $scope.user.likes = user.likes;
          $scope.user.dislikes = user.dislikes;
          $scope.user.imageUrl = user.imageUrl;
        },
        function(err) {
          console.error(err);
        }
      )
    },
    function(err) {
      swal("You must be logged in to view the previous page");
      $state.go("login")
    });
  console.log("profileCtrl");
});

app.controller("registerCtrl", function($scope, $http, $state){
  console.log("registerCtrl");

  $scope.doRegister = function(){
    var userData = { email: $scope.email, password: $scope.password, username: $scope.username };

    if ($scope.password === $scope.password2){
      $http.post("/users/register", userData)
        .then(function(data){
          console.log(data);
          swal("Registered Successfully!", "", "success");
          $state.go("login")
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
