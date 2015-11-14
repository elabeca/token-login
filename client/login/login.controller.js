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
              if (response.success) {
                AuthenticationService.setToken(response.token);
                $location.path('/secure/');
              } else {
                console.log(JSON.stringify(response));
              }
          });
        };
    }
 
})();