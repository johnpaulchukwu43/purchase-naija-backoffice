(function(){
    angular.module('mainApp.modules.admin.login')
        .controller('AdminLoginController', AdminLoginController);

    AdminLoginController.$inject = ['$scope','AuthenticationService'];

    function AdminLoginController($scope, AuthenticationService) {

        $scope.userDetails = {};
        $scope.isLoading = false;
        $scope.isError = false;
        $scope.errorMessage = null;
        $scope.loginHandler = function () {
            $scope.isLoading = true;
            AuthenticationService.adminLoginAction($scope.userDetails.username, $scope.userDetails.password).then(
                function (result) {
                    $scope.isLoading = false;
                    $scope.isError = false;
                    $scope.errorMessage = null;
                },
                function (error) {
                    $scope.isLoading = false;
                    $scope.isError = true;
                    $scope.errorMessage = error.data.message;
                    console.log("failed:"+error);
                })
        };
    }


})();
