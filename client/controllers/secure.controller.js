'use strict';

(function () {
  
    angular
        .module('app')
        .controller('SecureController', SecureController);
 
    SecureController.$inject = ['$location'];
    function SecureController($location) {
      let secureCtrl = this;

      $("video").hide();
    }

})();