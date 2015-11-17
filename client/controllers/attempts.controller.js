'use strict';

(function () {
  
    angular
        .module('app')
        .controller('AttemptsController', AttemptsController);
 
    AttemptsController.$inject = ['$location', 'AuthenticationService'];
    function AttemptsController($location, AuthenticationService) {
      let attemptsCtrl = this;

      $("video").hide();

      attemptsCtrl.allAttempts = [];

      attemptsCtrl.getAll = function() {
        AuthenticationService.getAllAttempts(function(response) {
            if (response.status == 200) {
              attemptsCtrl.allAttempts = _.map(response.data.result, function(x) { return x; });
            } else {
              console.log(`Oops! Problem retrieving attempts. Status code = ${response.status}`);
              if (response.status == 403) {
                attemptsCtrl.error = "Unauthorized access!";
              }
              attemptsCtrl.allAttempts = [];
            }
        });
      };

      attemptsCtrl.getAll();
    }

})();