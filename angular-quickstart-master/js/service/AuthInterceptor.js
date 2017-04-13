/*$http拦截器*/
angular.module('myApp')
    .factory('authInterceptor', function($rootScope,  $cookies){
    return {
        request: function(config){
            config.headers = config.headers || {};
            if($cookies.get('username')){
                config.headers.authorization = 'Bearer ' + $cookies.get('username');
            }
            return config;
        }
    };
});