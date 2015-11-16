(function () {
    'use strict';
 
    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);
 
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'views/login.view.html',
                controllerAs: 'loginCtrl'
            })
            .when('/attempts', {
                controller: 'AttemptsController',
                templateUrl: 'views/attempts.view.html',
                controllerAs: 'attemptsCtrl'
            })
            .otherwise({ redirectTo: '/login' });
    }
 
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // Keeping the user logged in
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.auth) {
            $http.defaults.headers.common['x-access-token'] = $rootScope.globals.auth.token;
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // Setting up restricted page redirect
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = $rootScope.globals.auth;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
 
})();