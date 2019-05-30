
var appUtil = require('../../appUtil');
var appInfo = window.app.details;

(function () {
    'use strict';

    angular
        .module('mainApp.modules.product.views')
        .controller('ProductViewsController',ProductViewsController)

    ProductViewsController.$inject = ['$scope', '$rootScope','AuthenticationService','ViewProductService', 'logger','exception'];

    function ProductViewsController($scope,$rootScope, AuthenticationService,ViewProductService, logger,exception) {

        //view related var
        $scope.noView = true;
        $rootScope.views = {};
        $rootScope.views.is_view_fashion = false;
        $rootScope.views.is_view_beauty = false;
        $rootScope.views.is_view_computer = false;
        $rootScope.views.is_view_phone = false;
        $rootScope.views.is_view_raw_materials = false;
        $rootScope.views.is_view_electronics = false;
        $rootScope.views.is_view_manufacturing = false;
        $scope.user_detail = AuthenticationService.getUser();
        $scope.currentCategory = null;
        $scope.currentCategoryFriendlyName = null;
        $scope.categories_types = [
            {label: ' -- Category Type -- ', value: 'default'},
            {label: 'Fashion Category', value: 'fashion'},
            {label: 'Beauty Category', value: 'beauty'},
            {label: 'Electronics Category', value: 'electronics'},
            {label: 'Raw materials Category', value: 'raw'},
            {label: 'Manufacturing Category', value: 'manufacturing'},
            {label: 'Phone Category', value: 'phone'},
            {label: 'Computer Category', value: 'computer'},
        ];
        //table related var
        $scope.tableState = null;
        $scope.isLoading = false;
        $scope.pageSize = 10;
        $scope.loadFailed = false;
        $scope.colspan = 10;
        $scope.currentView ='';

        //search related var
        $scope.searchTerm = null;
        $scope.isEmptyRecord = false;
        $scope.id_to_delete = null;
        $scope.name_to_delete = null;

        // product info
        $scope.products= {};
        $scope.products_info= {};
        $scope.noProducts = true;
        $scope.products_more_details = {};



        //function to identify current View That has invoked the controller :);
        $scope.identifyView = function(currentView){
            $scope.resetAllVariables();
            $scope.currentView = currentView;
        };

        $scope.resetAllVariables = function(){
            $scope.noView = true;
            $rootScope.views = {};
            $rootScope.views.is_view_fashion = false;
            $rootScope.views.is_view_beauty = false;
            $rootScope.views.is_view_computer = false;
            $rootScope.views.is_view_phone = false;
            $rootScope.views.is_view_raw_materials = false;
            $rootScope.views.is_view_electronics = false;
            $rootScope.views.is_view_manufacturing = false;
            $scope.currentCategory = null;
            $scope.currentCategoryFriendlyName = null;
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
            $scope.products= {};
            $scope.products_info= {};
            $scope.noProducts = true;
            $scope.products_more_details = {};
        };
        $scope.performSwitchAction =function(fashState,beautyState,computerState,phoneState,electronicsState,rawState,manufacturingState){
            $rootScope.views.is_view_fashion = fashState;
            $rootScope.views.is_view_beauty = beautyState;
            $rootScope.views.is_view_computer= computerState;
            $rootScope.views.is_view_phone= phoneState;
            $rootScope.views.is_view_raw_materials = rawState;
            $rootScope.views.is_view_electronics = electronicsState;
            $rootScope.views.is_view_manufacturing = manufacturingState;
        };

        $scope.switchViews = function (view_name) {
            switch (view_name) {
                case "fashion":
                    $scope.performSwitchAction(true,false,false,false,false,false,false);
                    $scope.noView = false;
                    $scope.currentCategory = appInfo.fashionCollection;
                    $scope.currentCategoryFriendlyName = view_name;
                    break;
                case 'raw':
                    $scope.performSwitchAction(false,false,false,false,false,true,false);
                    $scope.noView = false;
                    $scope.currentCategory = appInfo.rawMaterialCollection;
                    $scope.currentCategoryFriendlyName = view_name;
                    break;
                case 'manufacturing':
                    $scope.performSwitchAction(false,false,false,false,false,false,true);
                    $scope.noView = false;
                    $scope.currentCategory = appInfo.manufacturingCollection;
                    $scope.currentCategoryFriendlyName = view_name;
                    break;
                case 'beauty':
                    $scope.performSwitchAction(false,true,false,false,false,false,false);
                    $scope.noView = false;
                    $scope.currentCategory = appInfo.beautyCollection;
                    $scope.currentCategoryFriendlyName = view_name;
                    break;
                case 'electronics':
                    $scope.performSwitchAction(false,false,false,false,true,false,false);
                    $scope.noView = false;
                    $scope.currentCategory = appInfo.electronicCollections;
                    $scope.currentCategoryFriendlyName = view_name;

                    break;
                case 'phone':
                    $scope.performSwitchAction(false,false,false,true,false,false,false);
                    $scope.noView = false;
                    $scope.currentCategory = appInfo.phoneCollection;
                    $scope.currentCategoryFriendlyName = view_name;
                    break;
                 case 'computer':
                    $scope.performSwitchAction(false,false,true,false,false,false,false);
                    $scope.noView = false;
                    $scope.currentCategory = appInfo.computerCollection;
                    $scope.currentCategoryFriendlyName = view_name;
                     break;
                default:
                    $scope.performSwitchAction(false,false,false,false,false,false,false);
                    $scope.noView = true;
            }
        };

        $scope.goBack = function(){
            $scope.switchViews('HOME');
        };

        $scope.doPaginate = function(tableState) {
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

            if ($scope.searchTerm != null && $scope.searchTerm.trim().length > 0){
                if($rootScope.views.is_view_fashion){
                    $scope.searchForFashionProducts($scope.searchTerm ,start,number)
                }
            }else{
                $scope.loadProducts(start,number,$scope.currentView,$scope.products,$scope.products_info,$scope.noProducts,$scope.currentCategory).then(data=>{
                    $scope.products = data.products;
                    $scope.noProducts = data.noProducts;
                    $scope.$apply();
                }).catch(err=>{
                    $scope.$apply();
                });
            }
        };

        $scope.$watch('searchTerm', function () {
            $scope.isEmptyRecord = false;

            $scope.doPaginate($scope.tableState);
        });

        $scope.doCheck = function (products,noProducts,start,number) {

            if(products.total === 0){
                noProducts = true;
            }else{
                //if there are products
                noProducts = false;
                $scope.tableState.pagination.numberOfPages = products.pages;
                products = appUtil.normalizeData(products.docs,start,number);
            }
            return {
                products,
                noProducts
            }
        };

        $scope.loadProducts = function(start,number,currentView,productsContainer,productsContainerInfo,noProductsBoolean,productCategoryToFetch){
            return new Promise((resolve,reject)=>{
                $scope.isLoading = true;
                if(!$scope.user_detail){
                    $scope.loadFailed = true;
                    reject($scope.loadFailed);
                    return;
                }
                ViewProductService.getProduct(start,number,$scope.currentView,$scope.user_detail.info.name,productCategoryToFetch)
                    .then(function (result) {
                        productsContainerInfo = exception.handleGetRequestResponse(result,productsContainer);
                        $scope.isLoading = false;
                        if(productsContainerInfo!==null){
                            //then no errors
                            $scope.loadFailed = false;
                            var tmp_info = $scope.doCheck(productsContainerInfo,noProductsBoolean,start,number);
                        }else{
                            $scope.loadFailed = true;
                            reject($scope.loadFailed);
                        }
                        resolve({
                            products:tmp_info.products,
                            noProducts:tmp_info.noProducts
                        })
                    })
            });

        };

        $scope.searchForFashionProducts = function (searchTerm, start, number) {
            $scope.isLoading = true;
        };

        $scope.showProductInfo = function(data){
            console.log(JSON.stringify(data));
            $scope.products_more_details = data;
            console.log(JSON.stringify($scope.products_more_details));
        };

        $scope.deleteProduct =function(data){
            $scope.id_to_delete = data._id;
            $scope.name_to_delete = data.name;
        };

        $scope.deleteProductAction =function(){
            $scope.isLoading = true;
            ViewProductService.deleteProduct($scope.id_to_delete,$scope.currentCategory)
                .then(function (result) {
                    if(exception.handleDeleteRequestResponse(result));
                        $scope.doPaginate($scope.tableState);
                })
        }
    }


})();
