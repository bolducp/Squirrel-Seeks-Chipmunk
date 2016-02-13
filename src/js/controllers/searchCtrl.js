app.controller("searchCtrl", function($http, $state, $scope){

  $http.post("/users/auth")
    .then(function() {
      $http.get("/users/search")
        .then(function(res){
          console.log("data:", res);
          $scope.match = res.data.match;
          $scope.chat = res.data.chat;
          console.log("$scope.match:", $scope.match);
          console.log("$scope.chat:", $scope.chat);
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
