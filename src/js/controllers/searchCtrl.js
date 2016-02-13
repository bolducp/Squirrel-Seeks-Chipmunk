app.controller("searchCtrl", function($http, $state){
  $http.post("/users/auth")
    .then(function() {
      $http.get("/users/search")
        .then(function(matchData){
          console.log("matchData", matchData);
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
