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
