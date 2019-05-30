(function(){
    angular.module('mainApp.modules.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','AuthenticationService'];

    function LoginController($scope, AuthenticationService) {

        $scope.userDetails = {};
        $scope.isLoading = false;
        $scope.isError = false;
        $scope.errorMessage = null;
        $scope.loginHandler = function () {
            $scope.isLoading = true;
            AuthenticationService.loginAction($scope.userDetails.businessName, $scope.userDetails.password).then(
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
