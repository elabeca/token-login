'use strict';

(function () {
    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);
 
    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
        var service = {};
 
        service.login = login;
        service.setToken = setToken;
        service.clearToken = clearToken;
 
        return service;
 
        function login(username, password, callback) {
          $http({method: 'POST', url: '/api/authenticate', data: { username: username, password: password }})
            .then(function(response) {
              console.log("success");
              console.log(response.status);
              callback(response);
            }, function(response) {
              console.log("error");
              console.log(response.status);
              callback(response);
          });
        }

        function getAllAttempts(callback) {
          $http({method: 'GET', url: '/api/attempts'})
            .then(function(response) {
              console.log(response.status);
              callback(response);
            }, function(response) {
              console.log(response.status);
              callback(response);
          });
        }
 
        function setToken(token) {
          $rootScope.globals = {
              auth: {
                  token: token
              }
          };

          $http.defaults.headers.common['x-access-token'] = token;
          $cookieStore.put('globals', $rootScope.globals);
        }
 
        function clearToken() {
          $rootScope.globals = {};
          $cookieStore.remove('globals');
          $http.defaults.headers.common['x-access-token'] = '';
        }
    }
 
})();