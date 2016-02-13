app.controller("searchCtrl", function($http, $state, $scope){
  $http.post("/users/auth")
    .then(function() {
      $http.get("/users/search")
        .then(function(matchData){
          console.log("matchData.data", matchData.data);
          $scope.match = matchData.data;
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
