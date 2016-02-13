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
