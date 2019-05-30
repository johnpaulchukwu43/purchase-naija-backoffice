
var appUtil = require('../appUtil');
(function () {
    'use strict';

    angular
        .module('mainApp.modules.providers')
        .controller('ProvidersController',ProvidersController);

    ProvidersController.$inject = ['$scope', '$rootScope','AuthenticationService','ProviderService', 'logger','exception'];

    function ProvidersController($scope,$rootScope, AuthenticationService,ProviderService, logger,exception) {


        //table related var
        $scope.tableState = null;
        $scope.isLoading = false;
        $scope.pageSize = 10;
        $scope.loadFailed = false;
        $scope.colspan = 10;

        //search related var
        $scope.searchTerm = null;
        $scope.isEmptyRecord = false;
        $scope.id_to_delete = null;
        $scope.name_to_delete = null;

        //fashion related product info
        $scope.providers= {};
        $scope.providers_info= {};
        $scope.status_action='';
        $scope.provider ={};
        $scope.noProviders = true;
        $scope.providers_more_details = {};

        $scope.doPaginate = function(tableState){
            if (!tableState) {
                return;
            }
            $scope.tableState = tableState;
            var pagination = tableState.pagination;
            var start = pagination.start || 0;
            start = Math.ceil((start + 1) / $scope.pageSize);
            var number = pagination.number || $scope.pageSize;
            $scope.isLoading = true;
            $scope.loadFailed = false;
            $scope.loadProviders(start,number);
            // if ($scope.searchTerm != null && $scope.searchTerm.trim().length > 0){
            //     if($rootScope.views.is_view_fashion){
            //         $scope.searchForFashionProducts($scope.searchTerm ,start,number)
            //     }
            // }else{
            //     $scope.loadProviders(start,number);
            // }
        };

        // $scope.$watch('searchTerm', function () {
        //     $scope.isEmptyRecord = false;
        //
        //     $scope.doPaginate($scope.tableState);
        // });

        $scope.doCheck = function (provider,no_provider,start,number) {
            if(provider.total === 0){
                no_provider= true;
            }else{
                //if there are provider
                no_provider = false;
                $scope.tableState.pagination.numberOfPages = provider.pages;
                provider = appUtil.normalizeData(provider.docs,start,number);
            }
            return {
                provider,
                no_provider
            }
        };

        $scope.loadProviders = function(start,number){
            $scope.isLoading = true;
            ProviderService.getProviders(start,number)
                .then(function (result) {
                    $scope.providers_info = exception.handleGetRequestResponse(result,$scope.providers);
                    $scope.isLoading = false;
                    if($scope.providers_info!==null){
                        //then no errors
                        $scope.loadFailed = false;
                        var tmp_info = $scope.doCheck($scope.providers_info,$scope.noProviders,start,number);
                        $scope.noProviders =  tmp_info.no_provider;
                        $scope.providers =  tmp_info.provider;
                    }else{
                        $scope.loadFailed = true;
                    }
                    $scope.$apply();

                })
        }


        $scope.showDisableProviderModal = function(data){
            $scope.provider = data;
            if($scope.provider.status === 'ACTIVE'){
                $scope.status_action ='disable';
            }else if($scope.provider.status === 'INACTIVE'){
                $scope.status_action ='enable';
            }
        };

        $scope.disableProviderAction = function(){
            $scope.isLoading = true;
            // todo refractor
            if($scope.provider.status === 'ACTIVE'){
                $scope.provider.status ='INACTIVE'
            }else if($scope.provider.status === 'INACTIVE'){
                $scope.provider.status ='ACTIVE';
            }
            ProviderService.updateProvider($scope.provider._id,$scope.provider)
                .then(function (result) {
                    if(exception.handleDeleteRequestResponse(result));
                    $scope.doPaginate($scope.tableState);
                })
        };


        $scope.match_status_code = function (code) {
            switch (code) {
                case 'ACTIVE':
                    var val = {
                        "style": {
                            "background-color": "#2ecc71",

                        }
                    };
                    return val;
                case 'INACTIVE':
                    var val = {
                        "style": {
                            "background-color": "#e74c3c",

                        }
                    };
                    return val;

            }
        };

        $scope.updateProviderDetail =function(data){
            $scope.id_to_delete = data._id;
            $scope.isLoading = true;
            ProviderService.updateProvider($scope.id_to_delete,data)
                .then(function (result) {
                    if(exception.handleDeleteRequestResponse(result));
                    $scope.doPaginate($scope.tableState);
                })

        }


    }


})();
