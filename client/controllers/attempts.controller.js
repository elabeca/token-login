'use strict';

(function () {
  
    angular
        .module('app')
        .controller('AttemptsController', AttemptsController);
 
    AttemptsController.$inject = ['$location', '$log', 'AuthenticationService'];
    function AttemptsController($location, $log, AuthenticationService) {
      let attemptsCtrl = this;

      $("video").hide();

      attemptsCtrl.allAttempts = [];

      attemptsCtrl.getAll = function() {
        AuthenticationService.getAllAttempts(function(response) {
            if (response.status == 200) {
              attemptsCtrl.allAttempts = _.map(response.data.result, function(x) { return x; });
            } else {
              $log.error(`Oops! Problem retrieving attempts. Status code = ${response.status}`);
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