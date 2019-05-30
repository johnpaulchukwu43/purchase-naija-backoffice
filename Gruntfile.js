/*
 Created by Johnpaul Chukwu @ $
*/

module.exports = function (grunt) {

  var test = true;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      browserify:{
          bulkJSVendor:{
              files:{
                  'app/compiled/_gen_v.js': [
                      'app/lib/angular/angular.js',
                      'app/lib/angular-route/angular-route.js',
                      'node_modules/ng-file-upload/ng-file-upload-shim.js',
                      'node_modules/ng-file-upload/index.js',
                      'node_modules/angular-cloudinary/angular-cloudinary.js',
                      'node_modules/ngstorage/ngStorage.js',
                      'node_modules/angular-cookies/index.js',
                      'node_modules/ng-resource/lib/angular-resource.js',
                      'node_modules/angular-ui-router/release/angular-ui-router.js',
                      'node_modules/toastr/toastr.js',
                      'node_modules/angular-jwt/index.js',
                      'node_modules/axios/index.js',
                      'node_modules/angular-smart-table/index.js'
                  ]
              }
          },
          bulkJSApp: {
              files: {
                  'app/compiled/_gen_app.js': [
                      //core
                      'app/core/auth/auth.module.js',
                      'app/core/auth/auth-service.js',
                      'app/core/auth/roles.js',
                      'app/core/auth/authorities.js',
                      'app/core/logger/logger.module.js',
                      'app/core/logger/logger.js',
                      'app/core/exception/exception.module.js',
                      'app/core/exception/exception.js',
                      'app/core/exception/exception-handler.js',
                      'app/core/handler/request-handler.module.js',
                      'app/core/handler/request-handler.js',
                      'app/core/handler/endpoints.constant.js',
                      'app/core/core.module.js',
                      'app/core/constants.js',
                      // 'app/core/config/config-plugin.js',
                      //modules

                            //products upload
                      'app/modules/products/product.module.js',
                      'app/modules/products/upload/product.uploads.module.js',
                      'app/modules/products/upload/product-uploads-service.js',
                      'app/modules/products/upload/product-uploads-controller.js',
                            //product View
                      'app/modules/products/view/product.views.module.js',
                      'app/modules/products/view/product-views-service.js',
                      'app/modules/products/view/product-views-controller.js',
                      //home
                      'app/modules/home/home.module.js',
                      'app/modules/home/home-controller.js',
                            //login
                      'app/modules/login/login.module.js',
                      'app/modules/login/login-controller.js',
                            //providers
                      'app/modules/providers/providers.module.js',
                      'app/modules/providers/providers-views-controller.js',
                      'app/modules/providers/providers-views-service.js',
                            //orders
                      'app/modules/orders/orders.module.js',
                      'app/modules/orders/orders-views-controller.js',
                      'app/modules/orders/orders-views-service.js',
                            //admin
                      'app/modules/admin/admin.module.js',
                      'app/modules/admin/login/login.module.js',
                      'app/modules/admin/login/login-controller.js',
                      'app/modules/app.modules.js',
                      //commons
                      'app/commons/commons.module.js',
                      'app/commons/file-upload/file-upload-module.js',
                      'app/commons/file-upload/file-upload-directive.js',
                      'app/commons/file-upload/file-upload-service.js',
                      'app/commons/navbar/navbar-directive.js',
                      'app/commons/sidenav/sidenav-directive.js',
                      'app/commons/breadcrumbs/breadcrumb-directive.js',
                      //util class
                      'app/modules/appUtil.js',
                      // mainapp :)
                      'app/app.js'




                  ]
              }
          }
      },
    uglify: {
      bulkJSVendorMin: {
        options: {
          mangle: false,
          sourceMap: true,
          banner: "/* JS_ext <%= pkg.name %> | version-<%= pkg.version %> | <%= pkg.description %> | <%= grunt.template.today('yyyy-mm-dd') %> */"
        },

        files: {
          'app/compiled/_gen_v.js': [
              'app/compiled/_gen_v.js'
          ]
        }
      },

      bulkJSAppMin: {
        options: {
          mangle: !test,
          sourceMap: true,
          banner: "/* JS_app <%= pkg.name %> | version-<%= pkg.version %> | <%= pkg.description %> | <%= grunt.template.today('yyyy-mm-dd') %> */"
        },

        files: {
          'app/compiled/_gen_app.js': [
              'app/compiled/_gen_app.js'
          ]
        }
      }
    },

    jshint: {
      appScripts: {
        src: ["app/**/*.js"]
      },

      gruntFile: {
        src: ["Gruntfile.js"]
      }
    },


    watch: {

      appScripts: {
        files: ["app/**/*.js", "!Gruntfile.js", "!app/compiled/*.js"],
        tasks: ["browserify:bulkJSApp"]
      },

      // appCSS: {
      //   files: ["**/*.css", "!app/compiled/_gen_v.css"],
      //   tasks: ["cssmin"]
      // },

      gruntFile: {
        files: ["Gruntfile.js"],
        tasks: ["jshint:gruntFile", "uglify"]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  // grunt.registerTask('default', ['uglify', 'watch']);
  // grunt.registerTask('package', ['uglify']);
  grunt.registerTask('default', ['browserify','watch']);
  grunt.registerTask('production', ['browserify']);


};


