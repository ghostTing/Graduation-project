/*$http拦截器*/
angular.module('myApp')
    .factory('authInterceptor', function($rootScope,  $cookies){
    return {
        request: function(config){
            config.headers = config.headers || {};
                if($cookies.get('token')){
                    config.headers.authorization =$cookies.get('token') ;
                }
            return config;
        }
    };
});