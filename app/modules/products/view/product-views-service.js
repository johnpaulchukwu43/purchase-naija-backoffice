var appUtil = require('../../appUtil');
(function () {
    'use strict';
    var appInfo = window.app;

    angular
        .module('mainApp.modules.product.views')
        .factory('ViewProductService',ViewProductService);


    function ViewProductService($rootScope,requestHandler) {
        var service ={};

        service.getProduct= function (pageNum,pageSize,currentView,providerName,productCategoryToFetch) {
            var url;
            var providerEndpoints = appInfo.endpoints.SERVICE_PROVIDER_ENDPOINTS;
            var categoryUrl = determineCategoryUrl(productCategoryToFetch).getProducts;
            console.log(currentView);
            if(currentView === 'VIEW_ALL_PRODUCTS'){
                url = appUtil.modifyProductUrl(categoryUrl,pageSize,pageNum,'createdAt','DESC',false);

            }else if(currentView === 'VIEW_PRODUCTS_BY_PROVIDER'){
                url = appUtil.modifyProductUrl(providerEndpoints.getProductsInCategoryByProvider(providerName,categoryUrl),pageSize,pageNum,'createdAt','DESC',true);
            }
            console.log(url);
            return requestHandler.get(url);
        };

        service.deleteProduct = function(id,productCategoryToDelete){
            var url = determineCategoryUrl(productCategoryToDelete).deleteProduct+"/"+id;
            return requestHandler.delete(url);
        };


        return service;
    }

    function determineCategoryUrl(collectionName){
        var collection = appInfo.details;
        var customerEndpoints = appInfo.endpoints.CUSTOMER_ENDPOINTS;
        var providerEndpoints = appInfo.endpoints.SERVICE_PROVIDER_ENDPOINTS;

        switch (collectionName) {
            case collection.fashionCollection:
                return {
                    getProducts:customerEndpoints.getFashion,
                    deleteProduct:providerEndpoints.deleteFashion
                };
            case collection.computerCollection:
                return {
                    getProducts:customerEndpoints.getComputer,
                    deleteProduct:providerEndpoints.deleteComputer
                };
            case collection.beautyCollection:
                return {
                    getProducts:customerEndpoints.getBeauty,
                    deleteProduct:providerEndpoints.deleteBeauty
                };
            case collection.rawMaterialCollection:
                return {
                    getProducts:customerEndpoints.getRaw,
                    deleteProduct:providerEndpoints.deleteRawMaterials
                };
            case collection.phoneCollection:
                return {
                    getProducts:customerEndpoints.getPhones,
                    deleteProduct:providerEndpoints.deletePhone
                };
            case collection.manufacturingCollection:
                return {
                    getProducts:customerEndpoints.getManufacturing,
                    deleteProduct:providerEndpoints.deleteManufacturing
                };
            case collection.electronicCollections:
                return {
                    getProducts:customerEndpoints.getElectronics,
                    deleteProduct:providerEndpoints.deleteElectronics
                };
            default:
                return {
                    getProducts:customerEndpoints.getFashion,
                    deleteProduct:providerEndpoints.deleteFashion
                };
        }
    }
})();
