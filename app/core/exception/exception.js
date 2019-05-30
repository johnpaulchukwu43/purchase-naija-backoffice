(function() {
    'use strict';

    angular.module('mainApp.core.exception')
        .factory('exception', exception);

    /* @ngInject */
    function exception(logger) {
        var service = {
            catcher: catcher,
            handleGetRequestResponse:handleGetRequestResponse,
            handleDeleteRequestResponse:handleDeleteRequestResponse
        };
        return service;

        function catcher(response,dataBody) {
            var status = response.status;
            var data = response.data;
            if(status >=200 && status <= 300){
                logger.success(data.message);
                dataBody = {};
            }else if(status >=400 && status <= 500){
                if(status === 403){
                    logger.info("Session Expired : Re-login to continue")
                }
                logger.error(data.message,"[BadRequestException]:");
            }else if(status >=500 && status < 600){
                logger.error(data.message,"[ServerException]:");
            }else{
                logger.error(data.message,"[Unknown State]:");
            }
            return dataBody;
        }

        function handleGetRequestResponse(response,dataBody) {
            var status = response.status;
            var data = response.data;
            if(status >=200 && status <= 300){
                dataBody = data;
            }else if(status >=400 && status < 500){
                if(status === 403){
                    logger.info("Session Expired : Re-login to continue")
                }
                logger.error(data.message,"[BadRequestException]:");
                dataBody =null;
            }else if(status >=500 && status < 600){
                logger.error(data.message,"[ServerException]:");
                dataBody =null;
            }else{
                logger.error(data.message,"[Unknown State]:");
                dataBody =null;
            }
            return dataBody;
        }

        function handleDeleteRequestResponse(response) {
            var isDeleted = false;
            var status = response.status;
            if(status >=200 && status <= 300){
                logger.success(response.data.message);
                var isDeleted = true;
            }else if(status >=400 && status <= 500){
                if(status === 403){
                    logger.info("Session Expired : Re-login to continue")
                    return;
                }
                logger.error(data.message,"[BadRequestException]:");
            }else if(status >=500 && status < 600){
                logger.error(data.message,"[ServerException]:");
            }else{
                logger.error(data.message,"[Unknown State]:");
            }
            return isDeleted;
        }




    }
})();
