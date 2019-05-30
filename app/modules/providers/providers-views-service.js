var appUtil = require('../appUtil');
(function () {
    'use strict';
    var appInfo = window.app.endpoints;
    angular
        .module('mainApp.modules.providers')
        .factory('ProviderService',ProviderService);


    function ProviderService($rootScope,requestHandler) {
        var service ={};

        service.getProviders= function (pageNum,pageSize) {
             var url = appUtil.modifyProductUrl(appInfo.SUPER_ADMIN_ENDPOINTS.viewProviders,pageSize,pageNum);
            return requestHandler.get(url);
        };

        service.updateProvider= function (id,data) {
            var url = appInfo.SUPER_ADMIN_ENDPOINTS.editProviders(id);
            return requestHandler.put(url,data);
        };


        return service;
    }
})();
