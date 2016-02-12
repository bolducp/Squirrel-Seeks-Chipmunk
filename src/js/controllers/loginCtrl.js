app.controller("loginCtrl", function($scope, $http, $state){
  console.log("loginCtrl");

  $scope.doLogin = function(){
    var userData = { email: $scope.email, password: $scope.password };

    $http.post("/users/login", { email: $scope.email, password: $scope.password})
      .then(function(data){
        // if(data.newState){
        //   $state.go(data.newState);
        // }
        // else {
        //   $state.go("dash");
        // }

      }, function(err){
        console.error(err);
      });
  }

});
