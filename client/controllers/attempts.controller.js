'use strict';

(function () {
  
    angular
        .module('app')
        .controller('AttemptsController', AttemptsController);
 
    AttemptsController.$inject = ['$location', 'AuthenticationService'];
    function AttemptsController($location, AuthenticationService) {
      var vm = this;

      vm.attempts = getAllAttempts();

      function getAllAttempts() {
        AuthenticationService.getAllAttempts(function(response) {
            if (response.status == 200) {
              console.log(response.data.result);
              return response.data.result;
            } else {
              console.log("oops!" + JSON.stringify(response));
            }
        });
      };
    }

})();