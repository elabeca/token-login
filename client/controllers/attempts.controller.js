'use strict';

(function () {
  
    angular
        .module('app')
        .controller('AttemptsController', AttemptsController);
 
    AttemptsController.$inject = ['$location', 'AuthenticationService'];
    function AttemptsController($location, AuthenticationService) {
      var attemptsCtrl = this;

      attemptsCtrl.allAttempts = {};

      attemptsCtrl.getAll = function() {
        AuthenticationService.getAllAttempts(function(response) {
            if (response.status == 200) {
              console.log(response.data.result);
              attemptsCtrl.allAttempts = response.data.result;
            } else {
              console.log(`Oops! Problem retrieving attempts. Status code = ${response.status}`);
              attemptsCtrl.error = "Unauthorized access!";
              attemptsCtrl.allAttempts = {};
            }
        });
      };

      attemptsCtrl.getAll();
    }

})();