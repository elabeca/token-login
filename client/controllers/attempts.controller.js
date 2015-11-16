'use strict';

(function () {
  
    angular
        .module('app')
        .controller('AttemptsController', AttemptsController);
 
    AttemptsController.$inject = ['$location', 'AuthenticationService'];
    function AttemptsController($location, AuthenticationService) {
      var vm = this;

      vm.attempts = attempts;

      function getAttempts() {
        AuthenticationService.getAllAttempts(function (response) {
            if (response.success) {
              console.log(response);
            } else {
              console.log(response);
            }
        });
      };
    }

})();