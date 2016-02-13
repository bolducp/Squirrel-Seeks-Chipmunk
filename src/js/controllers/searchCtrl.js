app.controller("searchCtrl", function($http, $state, $scope, $timeout){

  $scope.newMatch = function() {
    location.reload();
  }

  $http.post("/users/auth")
    .then(function() {
      $http.get("/users/search")
        .then(function(res){
          $scope.match = res.data.match;
          $scope.chat = res.data.chat;

          $scope.sendMsg = function(chatMsg) {
            $http.post(`/users/chat/${$scope.chat._id}`, {sender: res.data.user, message: chatMsg})
            .then(function(message){
              var chatWindow = $("#chatWindow");
              chatWindow.scrollTop(chatWindow[0].scrollHeight);
              $scope.chat.messages.push(message.data);
            },
            function(err){return console.error(err);
            }
          );
            $scope.chatMsg = "";
          }

          getMessages();

          function getMessages(){
            $http.get(`/users/chat/${$scope.chat._id}`)
              .then(function(res){
                $scope.chat.messages = res.data;
                var chatWindow = $("#chatWindow")
                chatWindow.scrollTop(chatWindow[0].scrollHeight);
                $timeout(getMessages, 2000);
              }, function(err) {
                return  console.error(err);
              })
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
