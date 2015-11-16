'use strict';

(function () {
    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);
 
    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
        var service = {};
 
        service.login = login;
        service.getAllAttempts = getAllAttempts;
        service.setToken = setToken;
        service.clearToken = clearToken;
 
        return service;
 
        function login(username, password, cb) {
          $http({method: 'POST', url: '/api/authenticate', data: { username: username, password: password }})
            .then(function(response) {
              cb(response);
            }, function(response) {
              cb(response);
          });
        }

        function getAllAttempts(cb) {
          // $http.defaults.headers.common['x-access-token'] = $rootScope.globals.auth.token;
          $http({method: 'GET', url: '/api/auth/attempts'})
            .then(function(response) {
              console.log(response.status);
              cb(response);
            }, function(response) {
              console.log(response.status);
              cb(response);
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