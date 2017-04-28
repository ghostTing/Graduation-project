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
            .state(BASIC_DATA.routerConfig.paperPreview.state, {
                url: BASIC_DATA.routerConfig.paperPreview.url,
                templateUrl: BASIC_DATA.routerConfig.paperPreview.templateUrl,
                cache:true,
                controller: BASIC_DATA.routerConfig.paperPreview.controller,
            })
            .state(BASIC_DATA.routerConfig.contentAudit.state, {
                url: BASIC_DATA.routerConfig.contentAudit.url,
                templateUrl: BASIC_DATA.routerConfig.contentAudit.templateUrl,
                cache:true,
                controller: BASIC_DATA.routerConfig.contentAudit.controller
            })
    })
        .run(function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
            // to be used for back button //won't work when page is reloaded.
            $rootScope.previousState_name = fromState.name;
            $rootScope.previousState_params = fromParams;
        });
        //back button function called from back button's ng-click="back()"
        $rootScope.back = function() {//实现返回的函数
            $state.go($rootScope.previousState_name,$rootScope.previousState_params);
        };
    });
})();
