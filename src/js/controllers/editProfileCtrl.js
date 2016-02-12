app.controller("editProfileCtrl", function($scope, $http, $state){
  $http.post("/users/auth")
    .then(function(userData) {
      console.log("Authorized User");
      console.log("userData:", userData);
      $http.get("/users/profile")
        .then(function(profileData) {
          var user = profileData.data;
          console.log("user:", user);
          console.log("user.username:", user.username);
          $scope.user = {};
          $scope.user.email = user.email;
          $scope.user.username = user.username;
          $scope.user.gender = user.gender;
          $scope.user.seeking = user.seeking;
          $scope.user.dob = user.dob;
          $scope.user.likes = user.likes;
          $scope.user.dislikes = user.dislikes;
          $scope.user.imageUrl = user.imageUrl;
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
    console.log("$scope.user:", $scope.user);
    $http.post("/users/profile", $scope.user);
  }

  console.log("editProfileCtrl");
});
