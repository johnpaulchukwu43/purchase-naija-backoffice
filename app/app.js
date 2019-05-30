(function () {
    'use strict';

// Declare app level module which depends on views, and core components
    angular.module('mainApp', [
        'ui.router',
        'ngRoute',
        'ngStorage',
        'ngCookies',
        'angular-jwt',
        'mainApp.modules',
        'mainApp.commons',
        'mainApp.core'
    ]).config(config)
        .run(run);
    //config
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config ($routeProvider,$locationProvider){
        $locationProvider.hashPrefix('!');

        // $urlRouterProvider.otherwise('/home');

        // $stateProvider
        //     .state('home', {
        //         url: '/home',
        //         templateUrl: 'modules/home/home-index.html',
        //         controller: 'HomeController',
        //         controllerAs: 'vm',
        //         title: 'Dashboard',
        //     })
        $routeProvider
            .when('/', {
                templateUrl: 'modules/home/home-index.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                title: 'Dashboard'
            })
            .when('/login', {
                templateUrl: 'modules/login/index.html',
                controller: 'LoginController',
                title: 'Login'
            })
            .when('/access-control/gate', {
                templateUrl: 'modules/admin/login/index.html',
                controller: 'AdminLoginController',
                title: 'AdminLogin'
            })
            .when('/product/upload', {
                templateUrl: 'modules/products/upload/index.html',
                controller: 'ProductUploadController',
                controllerAs: 'vm',
                title: 'Product Upload'
            })
            .when('/product/view/all', {
                templateUrl: 'modules/products/view/all-products.html',
                controller: 'ProductViewsController',
                title: 'View All Products'
            })
            .when('/product/view/my', {
                templateUrl: 'modules/products/view/my-products.html',
                controller: 'ProductViewsController',
                title: 'View All Products'
            })
            .when('/providers', {
                templateUrl: 'modules/providers/index.html',
                controller: 'ProvidersController',
                title: 'View Providers'
            })
            .when('/orders/all', {
                templateUrl: 'modules/orders/all-orders.html',
                controller: 'OrdersController',
                title: 'View All Orders'
            })
            .when('/orders/my', {
                templateUrl: 'modules/orders/my-orders.html',
                controller: 'OrdersController',
                title: 'View My Orders'
            })
            .otherwise({ redirectTo: '/login' });


    }
    //run
    run.$inject = ['$rootScope','$cookies','$http','$location','AuthenticationService'];
    function run($rootScope,$cookies,$http,$location,AuthenticationService){
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.token;
        }


            // redirect to login page if not logged in and trying to access a restricted page
        console.log($location.path());
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            /* redirect to login page if not logged in and trying to access a restricted page
                and if already logged in head to home page
            */
            if($location.path() === '/login' || $location.path() === '/access-control/gate'){
                if(AuthenticationService.isLoggedIn()){
                    $location.path('/');
                }else{
                    return;
                }
            }else{
                var loggedIn = $cookies.getObject('globals');
                if (!loggedIn) {
                    $location.path('/login');
                }
            }

        });


    }

})();
