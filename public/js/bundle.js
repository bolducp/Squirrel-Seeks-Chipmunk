"use strict";

var app = angular.module("SSC", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("home", {url: "/", templateUrl: "/partials/home.html", controller: "homeCtrl"})
    .state("register", {url: "/register", templateUrl: "/partials/register.html", controller: "registerCtrl"})
    .state("login", {url: "/login", templateUrl: "/partials/login.html", controller: "loginCtrl"})
    .state("dash", {url: "/dashboard", templateUrl: "/partials/dashboard.html", controller: "dashCtrl"})
    .state("profile", {url: "/profile", templateUrl: "/partials/profile.html", controller: "profileCtrl"})
    .state("editProfile", {url: "/profile/edit", templateUrl: "/partials/editProfile.html", controller: "editProfileCtrl"})
    .state("search", {url: "/profile/search", templateUrl: "/partials/search.html", controller: "searchCtrl"})

  $urlRouterProvider.otherwise("/");
});

app.controller("dashCtrl", function($http, $state){
  $http.post("/users/auth")
    .then(function(userData) {
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

app.controller("editProfileCtrl", function($scope, $http, $state){
  $http.post("/users/auth")
    .then(function(userData) {
      $http.get("/users/profile")
        .then(function(profileData) {
          var user = profileData.data;
          $scope.user = user;
          $scope.user.dob = new Date(user.dob);
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

  $scope.updateProfile = function(){
    $http.post("/users/profile", $scope.user)
      .then(function(){
        swal("Profile updated!", "", "success");
        $state.go("profile");
      },
      function(err){
        console.error(err);
      });
  }
});

app.controller("homeCtrl", function($state, $http){
  console.log("homeCtrl");
  $http.post("/users/auth")
    .then(function() {
      $state.go("dash");
    }, function(err) {
      console.error(err);
    });
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
      $http.get("/users/profile")
        .then(function(profileData) {
          var user = profileData.data;
          $scope.user = user;
          if(user.dob){
            $scope.user.prettydob = moment(user.dob).format("LL");
          }
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

app.controller("searchCtrl", function($http, $state, $scope, $timeout){

  $scope.newMatch = function() {
    location.reload();
  }

  $http.post("/users/auth")
    .then(function() {
      $http.get("/users/search")
        .then(function(res){
          console.log("res", res);
          if(res.data.swalErr){
            swal(res.data.swalErr);
            $state.go("editProfile");
          }
          else {
            $scope.match = res.data.match;
            $scope.chat = res.data.chat;
            getMessages();
            function getMessages(){
              $http.get(`/users/chat/${$scope.chat._id}`)
                .then(function(res){
                  $scope.chat.messages = res.data;
                  var chatWindow = $("#chatWindow")
                  chatWindow.scrollTop(chatWindow[0].scrollHeight);
                  $timeout(getMessages, 2000);
                }, function(err) {
                  return  console.error(err);
                });
            }
          }

          $scope.sendMsg = function(chatMsg) {
            $http.post(`/users/chat/${$scope.chat._id}`, {sender: res.data.user, message: chatMsg})
            .then(function(message){
              var chatWindow = $("#chatWindow");
              chatWindow.scrollTop(chatWindow[0].scrollHeight);
              $scope.chat.messages.push(message.data);
            },
            function(err){return console.error(err);
            }
          );
            $scope.chatMsg = "";
          }



        }, function(err){
          console.error(err);
        })
    },
    function(err){
      swal("Error", "there was an error", "error");
      console.error(err);
    }
  );
});
