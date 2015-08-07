var myApp = angular.module('myApp', ['ngRoute', 'firebase', 'appControllers', 'jp.ng-bs-animated-button'])
    .constant('FIREBASE_URL', 'https://join-my-party.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.run(['$rootScope', '$location',
    function($rootScope, $location) {
        $rootScope.$on('$routeChangeError',
            function(event, next, previous, error) {
                if (error === 'AUTH_REQUIRED') {
                    $location.path('/login');
                    $rootScope.path = '/login';
                }
            });

        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            if ($rootScope.currentUser) { // if user already logged in
                $rootScope.path = '/parties';
                if(next.templateUrl === 'views/login.html' || 
                next.templateUrl === 'views/register.html') { // redirect to posting.html if logged in
                    $location.path('/parties');
                }
            } else { // if user is not logged in
                if (next.templateUrl === 'views/register.html') {
                    $location.path("/register");
                    $rootScope.path = '/register';
                } else {
                    $location.path("/login");
                    $rootScope.path = '/login';
                }
            }
        });
    }
]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'RegistrationController'
        }).
        when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegistrationController'
        }).
        when('/parties', {
            templateUrl: 'views/parties.html',
            controller: 'CheckinController',
            resolve: {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                }
            }
        }).
        when('/checkinList', {
            templateUrl: 'views/checkinList.html',
            controller: 'CheckinController',
            resolve: {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                }
            }
        }).
        when('/gallery1', {
            templateUrl: 'views/gallery1.html',
            resolve: {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                }
            }
        }).
        otherwise({
            redirectTo: '/parties'
        });
    }
]);
