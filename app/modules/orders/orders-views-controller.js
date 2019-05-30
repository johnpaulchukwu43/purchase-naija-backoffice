
var appUtil = require('../appUtil');
(function () {
    'use strict';

    angular
        .module('mainApp.modules.orders')
        .controller('OrdersController',OrdersController);

    OrdersController.$inject = ['$scope', '$rootScope','AuthenticationService','OrderService', 'logger','exception'];

    function OrdersController($scope,$rootScope, AuthenticationService,OrderService, logger,exception) {


        //table related var
        $scope.tableState = null;
        $scope.isLoading = false;
        $scope.pageSize = 10;
        $scope.isModalLoading = false;
        $scope.loadFailed = false;
        $scope.modalLoadFailed = false;
        $scope.colspan = 10;

        //search related var
        $scope.searchTerm = null;
        $scope.isEmptyRecord = false;
        $scope.id_to_delete = null;
        $scope.name_to_delete = null;

        //general product
        $scope.product_info = [];

        //fashion related product info
        $scope.orders= {};
        $scope.orders_info= {};
        $scope.orderCode = null;
        $scope.noorders = true;
        $scope.orders_more_details = {};
        $scope.currentView ='';


        const providerId = AuthenticationService.getUser().info.id;
        const providerName = AuthenticationService.getUser().info.name;
        $scope.resetAllVariables = function(){
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
            $scope.orders= {};
            $scope.orders_info= {};
            $scope.noorders = true;
            $scope.orders_more_details = {};
        };

        $scope.identifyView = function(currentView){
            $scope.currentView = currentView;
            $scope.resetAllVariables();
        };


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
            $scope.loadOrders(start,number);
            // if ($scope.searchTerm != null && $scope.searchTerm.trim().length > 0){
            //     if($rootScope.views.is_view_fashion){
            //         $scope.searchForFashionProducts($scope.searchTerm ,start,number)
            //     }
            // }else{
            //     $scope.loadOrders(start,number);
            // }
        };

        // $scope.$watch('searchTerm', function () {
        //     $scope.isEmptyRecord = false;
        //
        //     $scope.doPaginate($scope.tableState);
        // });

        $scope.doCheck = function (order,no_orders,start,number) {
            if(order.total === 0){
                no_orders= true;
            }else{
                //if there are orders
                no_orders = false;
                $scope.tableState.pagination.numberOfPages = order.pages;
                order = appUtil.normalizeData(order.docs,start,number);
            }
            return {
                order,
                no_orders
            }
        };

        $scope.viewProductsForDeliveryAdmin =function(item){
            $scope.isModalLoading = true;
            $scope.product_info = [];
            $scope.ordersResultWithCartInfo = item;
            angular.forEach($scope.ordersResultWithCartInfo,orders=>{
                var userCart =orders.userCart;
                $scope.fetchProductInfo(userCart.productId,userCart.category).then(result=>{
                    $scope.isModalLoading = false;
                    $scope.modalLoadFailed = false;
                    $scope.product_info.push({
                        quantity:userCart.quantity,
                        category:userCart.category,
                        provider:userCart.provider,
                        info:result.productInfo
                    });
                    $scope.$apply();
                }).catch(error=>{
                    $scope.isModalLoading = false;
                    $scope.modalLoadFailed = true;
                    $scope.$apply();
                });
            });
        };

        $scope.fetchProductInfo =function(productId,category){
            return new Promise((resolve, reject) => {
                OrderService.getProductDetailForOrder(productId,category).then(response=>{
                    var result ={};
                     result= exception.handleGetRequestResponse(response,result);
                    if(result){
                        resolve({success:true,productInfo:result.product})
                    }else {
                        reject({success:false})
                    }
                });
            });

        };

        $scope.loadOrders = function(start,number){
            $scope.isLoading = true;
            OrderService.getOrders(providerName,start,number,$scope.currentView,providerName)
                .then(function (result) {
                    $scope.orders_info = exception.handleGetRequestResponse(result,$scope.orders);
                    $scope.isLoading = false;
                    if($scope.orders_info!==null){
                        //then no errors
                        $scope.loadFailed = false;
                        var tmp_info = $scope.doCheck($scope.orders_info,$scope.noorders,start,number);
                        $scope.noorders =  tmp_info.no_orders;
                        $scope.orders =  tmp_info.order;
                    }else{
                        $scope.loadFailed = true;
                    }
                    $scope.$apply();

                })
        };


        $scope.showFashionProductInfo = function(data){
            console.log(JSON.stringify(data));
            $scope.orders_more_details = data;
            console.log(JSON.stringify($scope.orders_more_details));

        }


        $scope.match_status_code = function (code) {
            switch (code) {
                case true:
                    var val = {
                        "style": {
                            "background-color": "#2ecc71",

                        },
                        "del":'YES'
                    };
                    return val;
                case false:
                    var val = {
                        "style": {
                            "background-color": "#e74c3c",

                        },
                        "del":'NO'

                    };

                    return val;

            }
        };

        $scope.updateOrderDetailAction =function(){
            $scope.isLoading = true;
            OrderService.updateOrder($scope.orderCode)
                .then(function (result) {
                    if(exception.handleDeleteRequestResponse(result)){
                        $scope.doPaginate($scope.tableState);
                        $scope.orderCode = null;
                    }

                })

        };

        $scope.updateOrderDetail =function(orderCode){
            $scope.orderCode = orderCode;
        }


    }


})();
