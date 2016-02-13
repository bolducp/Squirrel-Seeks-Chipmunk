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

          $scope.sendMsg = function(chatMsg) {
            console.log("$scope.chat._id:", $scope.chat._id);
            console.log("chatMsg:", chatMsg);
            $http.post(`/users/chat/${$scope.chat._id}`, {sender: res.data.user, message: chatMsg})
            .then(function(message){
              $scope.chat.messages.push(message.data);
            },
            function(err){return console.error(err);
            }
          );
            $scope.chatMsg = "";
          }
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
