'use strict';

(function () {

    angular
        .module('app')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$location', 'AuthenticationService'];
    function LoginController($location, AuthenticationService) {
        var vm = this;
 
        vm.login = login;
 
        (function initController() {
          AuthenticationService.clearToken();
        })();
 
        function login() {
          AuthenticationService.login(vm.username, vm.password, function (response) {
              if (response.status == 200) {
                AuthenticationService.setToken(response.token);
                $location.path('/attempts/');
              } else {
                console.log("Authentication failed: " + response.status);
              }
          });
        };
    }
 
})();