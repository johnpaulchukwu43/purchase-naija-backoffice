(function () {
    'use strict';
    var axios =  require("axios");
    var appInfo = window.app.endpoints;
    angular
        .module('mainApp.modules.product.upload')
        .factory('productUploadService',productUploadService);


    function productUploadService($rootScope,requestHandler) {
        var service ={};

        service.saveFashionProduct= function (data) {
             var url = appInfo.SERVICE_PROVIDER_ENDPOINTS.uploadFashion;
            return requestHandler.post(url,data);
        };

        service.saveRawProduct= function (data) {
            var url = appInfo.SERVICE_PROVIDER_ENDPOINTS.uploadRaw;
            return requestHandler.post(url,data);
        };

        service.saveManufacturingProduct= function (data) {
            var url = appInfo.SERVICE_PROVIDER_ENDPOINTS.uploadManufacturing;
            return requestHandler.post(url,data);
        };

        service.saveBeautyProduct= function (data) {
            var url = appInfo.SERVICE_PROVIDER_ENDPOINTS.uploadBeauty;
            return requestHandler.post(url,data);
        };

        service.saveElectronicsProduct= function (data) {
            var url = appInfo.SERVICE_PROVIDER_ENDPOINTS.uploadElectronics;
            return requestHandler.post(url,data);
        };

        return service;
    }
})();
