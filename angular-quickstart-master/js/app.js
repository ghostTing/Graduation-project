(function () {
    angular.module('myApp', ['ui.router', 'ngCookies','oitozero.ngSweetAlert']).config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise(BASIC_DATA.routerConfig.taskUpload.state);
        $stateProvider
            .state(BASIC_DATA.routerConfig.taskUpload.state, {
                url: BASIC_DATA.routerConfig.taskUpload.url,
                templateUrl:BASIC_DATA.routerConfig.taskUpload.templateUrl,
                cache: true,
                controller: BASIC_DATA.routerConfig.taskUpload.controller
            })
            .state(BASIC_DATA.routerConfig.taskUpload.childrenPage.resourceUpload.state, {
                url: BASIC_DATA.routerConfig.taskUpload.childrenPage.resourceUpload.url,
                templateUrl: BASIC_DATA.routerConfig.taskUpload.childrenPage.resourceUpload.templateUrl,
                cache:true,
                controller: BASIC_DATA.routerConfig.taskUpload.childrenPage.resourceUpload.controller
            })
            .state(BASIC_DATA.routerConfig.contentProduce.state, {
                url: BASIC_DATA.routerConfig.contentProduce.url,
                templateUrl:BASIC_DATA.routerConfig.contentProduce.templateUrl,
                cache: true,
                controller: BASIC_DATA.routerConfig.contentProduce.controller
            })
            .state('page3', {
                url: '/page3',
                templateUrl:"view/page3.html",
                cache: true,
                controller: 'NoteController'
            });
    });
})();
