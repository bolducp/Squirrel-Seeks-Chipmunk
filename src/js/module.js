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
