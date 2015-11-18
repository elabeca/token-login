'use strict';

(function () {

    angular
        .module('app')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$location', '$log', 'AuthenticationService'];
    function LoginController($location, $log, AuthenticationService) {
        let loginCtrl = this;

        $("video").show();

        (function initController() {
          AuthenticationService.clearToken();
        })();
 
        loginCtrl.signIn = function() {
          AuthenticationService.login(loginCtrl.username, loginCtrl.password, function (response) {
              if (response.status == 200) {
                AuthenticationService.setToken(response.data.token, response.config.data.username);
                if (response.config.data.username === 'admin') {
                  $location.path('/attempts/');
                } else {
                  $location.path('/secure/');
                }
              } else {
                $log.error(`Authentication failed: ${response.status}`);
                loginCtrl.error = "Authentication failed! Please try again.";
              }
          });
        };
    }
 
})();