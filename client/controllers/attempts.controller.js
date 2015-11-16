'use strict';

(function () {
  
    angular
        .module('app')
        .controller('AttemptsController', AttemptsController);
 
    AttemptsController.$inject = ['$location', 'AuthenticationService'];
    function AttemptsController($location, AuthenticationService) {
      var vm = this;

      vm.attempts = getAttempts();

      function getAttempts() {
        AuthenticationService.getAllAttempts(function (response) {
            if (response.success) {
              console.log(JSON.stringify(response));
              return response.data.result;
            } else {
              console.log(response);
            }
        });
      };
    }

})();