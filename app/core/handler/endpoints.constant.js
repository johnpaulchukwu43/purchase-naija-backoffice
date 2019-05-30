var app = {

    endpoints: {
        API_HOST: 'https://purchase9ja-api.scalingo.io/',
        API_URL: 'https://purchase9ja-api.scalingo.io/api/v1',
        SERVICE_PROVIDER_ENDPOINTS:
            {
                login: '/serviceProvider/login',
                uploadFashion: '/serviceProvider/products/fashion',
                getOrders: function (providerName) {
                    return '/serviceProvider/order/' + providerName
                },
                editOrder: function (orderId) {
                    return '/admin/single-order/' + orderId

                },
                getProductsInCategoryByProvider: function (providerName, productCategoryPath) {
                    return '/serviceProvider' + productCategoryPath + '?provider=' + providerName;
                },

                uploadRaw: '/serviceProvider/products/rawmaterial',
                uploadManufacturing: '/serviceProvider/products/manufacturing',
                uploadBeauty: '/serviceProvider/products/beauty',
                uploadElectronics: '/serviceProvider/products/electronics',
                deleteFashion: '/serviceProvider/products/fashion',
                deleteBeauty: '/serviceProvider/products/beauty',
                deleteComputer: '/serviceProvider/products/computer',
                deleteElectronics: '/serviceProvider/products/electronics',
                deleteManufacturing: '/serviceProvider/products/manufacturing',
                deletePhone: '/serviceProvider/products/phone',
                deleteRawMaterials: '/serviceProvider/products/rawmaterial',

            },
        CUSTOMER_ENDPOINTS: {
            //productCategoryPath
            getFashion: '/products/fashion',
            getBeauty: '/products/beauty',
            getComputer: '/products/computer',
            getElectronics: '/products/electronics',
            getManufacturing: '/products/manufacturing',
            getPhones: '/products/phone',
            getRaw: '/products/rawmaterial',
        },
        SUPER_ADMIN_ENDPOINTS: {
            login: '/admin/login',
            viewProviders: '/admin/providers/',
            getAllOrders: '/admin/orders/',
            editProviders: function (id) {
                return '/admin/providers/' + id;
            },
            editOrder: function (orderCode) {
                return '/admin/order/' + orderCode;
            },

        }
    },

    details: {
        APP_NAME: 'Project',
        FASHION: 'fashions',
        RAW_MATERIAL: 'rawMaterials',
        MANUFACTURING: 'manufacturing',
        BEAUTY: 'beauties',
        CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/jworks/image/upload',
        CLOUDINARY_UPLOAD_PRESET: 'test-preset',
        fashionCollection: 'fashions',
        rawMaterialCollection: 'rawMaterials',
        phoneCollection: 'phones',
        electronicCollections: 'electronics',
        manufacturingCollection: 'manufacturing',
        beautyCollection: 'beauties',
        computerCollection: 'computers',
        cartTypes: ['customer', 'guest'],
    },
    roles: {
        SUPER_ADMIN: "super-admin",
        PROVIDER_ADMIN: "provider-admin",
        CUSTOMER: "customer",
        GUEST: "guest"
    },

    authorities: {
        CAN_CHANGE_SYSTEM_SETTINGS: "CAN_CHANGE_SYSTEM_SETTINGS",
        CAN_CHANGE_SITE_LAYOUT: "CAN_CHANGE_SITE_LAYOUT",
        CAN_VIEW_ALL_PROVIDERS: "CAN_VIEW_ALL_PROVIDERS",
        CAN_VIEW_PROVIDERS: "CAN_VIEW_PROVIDERS",
        CAN_EDIT_PROVIDERS_DETAIL: "CAN_EDIT_PROVIDERS_DETAIL",
        CAN_DISABLE_PROVIDER: "CAN_DISABLE_PROVIDER",
        CAN_ENABLE_PROVIDER: "CAN_ENABLE_PROVIDER",
        CAN_VIEW_ALL_PRODUCTS: "CAN_VIEW_ALL_PRODUCTS",
        CAN_EDIT_ALL_PRODUCTS: "CAN_EDIT_ALL_PRODUCTS",
        CAN_UPLOAD_ALL_PRODUCTS: "CAN_UPLOAD_ALL_PRODUCTS",
        CAN_VIEW_MY_PRODUCTS: "CAN_VIEW_MY_PRODUCTS",
        CAN_DELETE_MY_PRODUCTS: "CAN_DELETE_MY_PRODUCTS",
        CAN_EDIT_MY_PRODUCTS: "CAN_DELETE_MY_PRODUCTS",
        CAN_VIEW_MY_ORDERS_AS_PROVIDER: "CAN_VIEW_MY_ORDERS_AS_PROVIDER",
        CAN_VIEW_ALL_ORDERS: "CAN_VIEW_ALL_ORDERS",
        CAN_UPDATE_MY_PROFILE_AS_PROVIDER: "CAN_UPDATE_MY_PROFILE_AS_PROVIDER",
        CAN_UPDATE_MY_ORDERS_DELIVERY_STATUS: "CAN_UPDATE_MY_ORDERS_DELIVERY_STATUS",
    },

    applicationRoleAuthorities:
        {
            PROVIDER_ADMIN_AUTHORITIES:
                {
                    CAN_UPLOAD_ALL_PRODUCTS: "CAN_UPLOAD_ALL_PRODUCTS",
                    CAN_VIEW_MY_PRODUCTS: "CAN_VIEW_MY_PRODUCTS",
                    CAN_DELETE_MY_PRODUCTS: "CAN_DELETE_MY_PRODUCTS",
                    CAN_EDIT_MY_PRODUCTS: "CAN_EDIT_MY_PRODUCTS",
                    CAN_UPDATE_MY_PROFILE_AS_PROVIDER: "CAN_UPDATE_MY_PROFILE_AS_PROVIDER",
                    CAN_VIEW_MY_ORDERS_AS_PROVIDER: "CAN_VIEW_MY_ORDERS_AS_PROVIDER",
                    CAN_UPDATE_MY_ORDERS_DELIVERY_STATUS: "CAN_UPDATE_MY_ORDERS_DELIVERY_STATUS",
                },

            SUPER_ADMIN_AUTHORITIES:
                {
                    CAN_CHANGE_SYSTEM_SETTINGS: "CAN_CHANGE_SYSTEM_SETTINGS",
                    CAN_CHANGE_SITE_LAYOUT: "CAN_CHANGE_SITE_LAYOUT",
                    CAN_VIEW_ALL_PROVIDERS: "CAN_VIEW_ALL_PROVIDERS",
                    CAN_VIEW_PROVIDERS: "CAN_VIEW_PROVIDERS",
                    CAN_EDIT_PROVIDERS_DETAIL: "CAN_EDIT_PROVIDERS_DETAIL",
                    CAN_DISABLE_PROVIDER: "CAN_DISABLE_PROVIDER",
                    CAN_ENABLE_PROVIDER: "CAN_ENABLE_PROVIDER",
                    CAN_VIEW_ALL_PRODUCTS: "CAN_VIEW_ALL_PRODUCTS",
                    CAN_EDIT_ALL_PRODUCTS: "CAN_EDIT_ALL_PRODUCTS",
                    CAN_UPLOAD_ALL_PRODUCTS: "CAN_UPLOAD_ALL_PRODUCTS",
                    CAN_VIEW_MY_PRODUCTS: "CAN_VIEW_MY_PRODUCTS",
                    CAN_DELETE_MY_PRODUCTS: "CAN_DELETE_MY_PRODUCTS",
                    CAN_EDIT_MY_PRODUCTS: "CAN_DELETE_MY_PRODUCTS",
                    CAN_VIEW_MY_ORDERS_AS_PROVIDER: "CAN_VIEW_MY_ORDERS_AS_PROVIDER",
                    CAN_VIEW_ALL_ORDERS: "CAN_VIEW_ALL_ORDERS",
                    CAN_UPDATE_MY_PROFILE_AS_PROVIDER: "CAN_UPDATE_MY_PROFILE_AS_PROVIDER",
                    CAN_UPDATE_MY_ORDERS_DELIVERY_STATUS: "CAN_UPDATE_MY_ORDERS_DELIVERY_STATUS",
                }

        }

};



