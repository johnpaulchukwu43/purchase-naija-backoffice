(function () {
    'use strict';
    var appInfo = window.app.details;
    angular
        .module('mainApp.modules.product.upload')
        .controller('ProductUploadController', ProductUploadController);

    ProductUploadController.$inject = ['$scope', '$rootScope','AuthenticationService','productUploadService', 'logger','exception'];

    function ProductUploadController($scope,$rootScope, AuthenticationService,productUploadService, logger,exception) {

        $scope.title = 'Products Upload';
        $rootScope.is_fashion = false;
        $rootScope.is_beauty = false;
        $rootScope.is_computer = false;
        $rootScope.is_phone = false;
        $rootScope.is_raw_materials = false;
        $rootScope.is_electronics = false;
        $rootScope.is_manufacturing = false;
        $scope.user_detail = null;

        $scope.fashion_info = {};
        $scope.raw_info = {};
        $scope.manufacturing={};
        $scope.beauty_info={};
        $scope.electronics_info={};
        $scope.product_size = [];

        $scope.categories_types = [
            {label: ' -- Category Type -- ', value: 'default'},
            {label: 'Fashion Category', value: 'fashion'},
            {label: 'Beauty Category', value: 'beauty'},
            {label: 'Electronics Category', value: 'electronics'},
            {label: 'Raw materials Category', value: 'raw'},
            {label: 'Manufacturing Category', value: 'manufacturing'},
            {label: 'Phone Category', value: 'phone'},
        ];



        $scope.initController = function () {
            for (var i = 0; i <= 60; i++) {
                $scope.product_size.push(i.toString());
            }
            $scope.user_detail = AuthenticationService.getUser();
        };

        $scope.performSwitchAction =function(fashState,beautyState,computerState,phoneState,electronicsState,rawState,manufacturingState){
            $rootScope.is_fashion = fashState;
            $rootScope.is_beauty = beautyState;
            $rootScope.is_computer = computerState;
            $rootScope.is_phone = phoneState;
            $rootScope.is_electronics = electronicsState;
            $rootScope.is_raw_materials = rawState;
            $rootScope.is_manufacturing = manufacturingState;
        };

        $scope.switchViews = function (view_name) {
            switch (view_name) {
                case "fashion":
                 $scope.performSwitchAction(true,false,false,false,false,false,false,)
                    break;
                case 'raw':
                    $scope.performSwitchAction(false,false,false,false,false,true,false)
                    break;
                case 'manufacturing':
                    $scope.performSwitchAction(false,false,false,false,false,false,true)
                    break;
                case 'beauty':
                    $scope.performSwitchAction(false,true,false,false,false,false,false)
                    break;
                case 'electronics':
                    $scope.performSwitchAction(false,false,false,false,true,false,false)
                    break;
                default:
                    $scope.performSwitchAction(false,false,false,false,false,false,false)

            }
        };

        $scope.checkIfImageIsUploaded = function(){
            if(!$rootScope.img_url){
                logger.error("Image not selected yet");
                return false;
            }
            return true;
        };

        $scope.appendExtraInfo = function (dataBody,productType){
            dataBody.imageUrls =[];
            dataBody.colors =[];
            dataBody.imageUrls.push($rootScope.img_url);
            if(dataBody.color){
                dataBody.colors.push(dataBody.color);
            }
            dataBody.provider = $scope.user_detail.info.name;
            return dataBody;
        };
        $scope.resetFields =function(dataBody){
            //if the body is null, remind angular to update the dom :)
            if(!dataBody.name){
                $scope.$apply(function () {
                    $rootScope.is_img_uploaded = false;
                })
            }
        };



        //fashion controller
        $scope.genders = [
            'Male', 'Female','Unisex'
        ];
        $scope.createFashionProduct = function (isValid) {
            if(isValid){
                if($scope.checkIfImageIsUploaded()){
                    //save product
                    $scope.data = $scope.appendExtraInfo($scope.fashion_info,appInfo.FASHION);
                    productUploadService.saveFashionProduct($scope.data)
                        .then(function (result) {
                            //if everything goes fine the model will be cleared else remains the same
                            $scope.fashion_info = exception.catcher(result);
                            $scope.resetFields($scope.fashion_info)
                        }).catch(err=>{
                            console.log(JSON.stringify(err));
                    })
                }
            }else{
                logger.error("Enter information for required fields");
            }
        };

        //raw controller
        $scope.createRawProduct = function(isValid){
            if(isValid){
                if($scope.checkIfImageIsUploaded()){
                    $scope.data = $scope.appendExtraInfo($scope.raw_info,appInfo.RAW_MATERIAL);
                    productUploadService.saveRawProduct($scope.data)
                        .then(function (result) {
                            $scope.raw_info = exception.catcher(result);
                            $scope.resetFields($scope.raw_info)

                        })
                }
            }else{
                logger.error("Enter information for required fields");
            }
        };

        //manufacturing controller
        $scope.sub_manufacturing_categories = [
            {label: ' -- Category Type -- ', value: 'default'},
            {label: 'AutoMobiles', value: 'AutoMobiles'},
            {label: 'Agriculture', value: 'Agriculture'},
            {label: 'Electronics', value: 'Electronics'},
            {label: 'Textile', value: 'Textile'},
            {label: 'Construction', value: 'Construction'},
        ];
        $scope.createManufacturingProduct = function(isValid){
            if(isValid){
                if($scope.checkIfImageIsUploaded()){
                    $scope.data = $scope.appendExtraInfo($scope.manufacturing,appInfo.MANUFACTURING);
                    productUploadService.saveManufacturingProduct($scope.data)
                        .then(function (result) {
                            //if everything goes fine the model will be cleared else remains the same
                            $scope.manufacturing = exception.catcher(result);
                            $scope.resetFields($scope.raw_info)
                        })
                }
            }else{
                logger.error("Enter information for required fields");
            }

        }

        //beauty controller
        $scope.sub_beuaty_categories = [
            {label: ' -- Category Type -- ', value: 'default'},
            {label: 'Cosmetics', value: 'Cosmetics'},
            {label: 'Fragrance', value: 'Fragrance'},
            {label: 'HairProducts', value: 'HairProducts'},
            {label: 'Lotions', value: 'Lotions'},
        ];
        $scope.createBeautyProduct = function(isValid){
            if(isValid){
                if($scope.checkIfImageIsUploaded()){
                    $scope.data = $scope.appendExtraInfo($scope.beauty_info,appInfo.BEAUTY);
                    productUploadService.saveBeautyProduct($scope.data)
                        .then(function (result) {
                            //if everything goes fine the model will be cleared else remains the same
                            $scope.beauty_info = exception.catcher(result);
                            $scope.resetFields($scope.beauty_info)
                        })
                }
            }else{
                logger.error("Enter information for required fields");
            }

        };

        //electronics controller
        $scope.sub_beuaty_electonics = [
            {label: ' -- Category Type -- ', value: 'default'},
            {label: 'Accessories', value: 'Accessories'},
            {label: 'Cameras', value: 'Cameras'},
            {label: 'TV', value: 'Tv'},
            {label: 'Refrigerators', value: 'Refrigerators'},
            {label: 'WashingMachine', value: 'WashingMachine'},
            {label: 'Pressing Iron', value: 'Pressing Iron'},
            {label: 'Blenders', value: 'Blenders'},
            {label: 'Game Consoles', value: 'Game Consoles'},
            {label: 'Air Conditioners', value: 'Air Conditioners'},
        ];
        $scope.createElectronicsProduct = function(isValid){
            if(isValid){
                if($scope.checkIfImageIsUploaded()){
                    $scope.data = $scope.appendExtraInfo($scope.electronics_info,appInfo.electronicCollections);
                    productUploadService.saveElectronicsProduct($scope.data)
                        .then(function (result) {
                            //if everything goes fine the model will be cleared else remains the same
                            $scope.beauty_info = exception.catcher(result);
                            $scope.resetFields($scope.beauty_info)
                        })
                }
            }else{
                logger.error("Enter information for required fields");
            }

        }

    }
})();
