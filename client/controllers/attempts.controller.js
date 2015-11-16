'use strict';

(function () {
  
    angular
        .module('app')
        .controller('AttemptsController', AttemptsController);
 
    AttemptsController.$inject = ['$location', 'AuthenticationService'];
    function AttemptsController($location, AuthenticationService) {
      var attempts = this;

      attempts.getAllAttempts = function() {
        AuthenticationService.getAllAttempts(function(response) {
            if (response.status == 200) {
              console.log(response.data.result);
              return response.data.result;
            } else {
              console.log(`Oops! Problem retrieving attempts. Status code = ${response.status}`);
              return {};
            }
        });
      };
      
    }

})();