var appUtil = require('../appUtil');
(function () {
    'use strict';
    var appInfo = window.app.endpoints;
    var collection = window.app.details;
    const customer = window.app.endpoints.CUSTOMER_ENDPOINTS;
    angular
        .module('mainApp.modules.orders')
        .factory('OrderService', OrderService);


    function OrderService($rootScope, requestHandler) {
        var service = {};
        service.getOrders = function (providerId, pageNum, pageSize, currentView, providerName) {
            var url;

            if (currentView === 'VIEW_ALL_ORDERS') {
                url = appUtil.modifyProductUrl(appInfo.SUPER_ADMIN_ENDPOINTS.getAllOrders, pageSize, pageNum, 'createdAt', 'DESC', false);

            } else if (currentView === 'VIEW_ORDERS_BY_PROVIDER') {
                 url = appUtil.modifyProductUrl(appInfo.SERVICE_PROVIDER_ENDPOINTS.getOrders(providerName), pageSize, pageNum, 'createdAt', 'DESC', false);
            }
            return requestHandler.get(url);
        };

        service.updateOrder = function (orderId) {
            var url = appInfo.SUPER_ADMIN_ENDPOINTS.editOrder(orderId);
            return requestHandler.put(url);
        };

        service.getProductDetailForOrder =function(productId,category){
            var url = determineCategoryEndpoint(category)+'/'+productId;
            return requestHandler.get(url);

        };


        return service;
    }

    function determineCategoryEndpoint(category){
        switch(category){
            case collection.fashionCollection:
                return customer.getFashion;
            case collection.manufacturingCollection:
                return customer.getManufacturing;
            case collection.electronicCollections:
                return customer.getElectronics;
            case collection.phoneCollection:
                return customer.getPhones;
            case collection.rawMaterialCollection:
                return customer.getRaw;
            case collection.beautyCollection:
                return customer.getBeauty;
            case collection.computerCollection:
                return customer.getComputer;
        }
    }
})();
