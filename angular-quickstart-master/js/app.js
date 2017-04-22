(function () {
    angular.module('myApp', ['ui.router', 'ngCookies','oitozero.ngSweetAlert'])
    .config(function($stateProvider, $urlRouterProvider,$httpProvider){
        $httpProvider.interceptors.push('authInterceptor');
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
            .state(BASIC_DATA.routerConfig.contentProduce.childrenPage.answerProduce.state, {
                url: BASIC_DATA.routerConfig.contentProduce.childrenPage.answerProduce.url+'/:parentIndex/'+':childIndex/'+':questionIndex',
                templateUrl: BASIC_DATA.routerConfig.contentProduce.childrenPage.answerProduce.templateUrl,
                cache:true,
                controller: BASIC_DATA.routerConfig.contentProduce.childrenPage.answerProduce.controller,
                params:{args:{}}
            })
    });
})();
