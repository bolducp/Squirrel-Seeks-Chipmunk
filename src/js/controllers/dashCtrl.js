app.controller("dashCtrl", function($http, $state){
  $http.post("/users/auth")
    .then(function(userData) {
      $http.get("/users/dashboard")
        .then(function(){},
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
