app.controller("homeCtrl", function($state, $http){
  console.log("homeCtrl");
  $http.post("/users/auth")
    .then(function() {
      $state.go("dash");
    }, function(err) {
      console.error(err);
    });
});
