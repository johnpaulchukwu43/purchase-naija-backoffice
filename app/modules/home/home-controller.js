/*
 Created by Johnpaul Chukwu @ $
*/

(function () {
    'use strict';

    angular
        .module('mainApp.modules.home')
        .controller('HomeController', HomeController);

    function HomeController(AuthenticationService,logger) {
        var vm = this;

        initController();

        function initController() {
            vm.title = 'Dashboard'
        }

    }

})();
