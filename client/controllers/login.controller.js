'use strict';

(function () {

    angular
        .module('app')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$location', 'AuthenticationService'];
    function LoginController($location, AuthenticationService) {
        var loginCtrl = this;

        $("video").show();

        (function initController() {
          AuthenticationService.clearToken();
        })();
 
        loginCtrl.signIn = function() {
          AuthenticationService.login(loginCtrl.username, loginCtrl.password, function (response) {
              if (response.status == 200) {
                AuthenticationService.setToken(response.data.token);
                $location.path('/attempts/');
              } else {
                console.log(`Authentication failed: ${response.status}`);
                loginCtrl.error = "Authentication failed! Please try again.";
              }
          });
        };
    }
 
})();