(function () {
    'use strict';
 
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
 
            // /* Dummy authentication for testing, uses $timeout to simulate api call
            //  ----------------------------------------------*/
            // $timeout(function () {
            //     var response;
            //     UserService.GetByUsername(username)
            //         .then(function (user) {
            //             if (user !== null && user.password === password) {
            //                 response = { success: true };
            //             } else {
            //                 response = { success: false, message: 'Username or password is incorrect' };
            //             }
            //             callback(response);
            //         });
            // }, 1000);
 
            $http.post('http://localhost/api/authenticate:8080', { username: username, password: password })
                .error(function(response) {
                  console.log(JSON.stringify(response));
                })
                .success(function (response) {
                  console.log(JSON.stringify(response));
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