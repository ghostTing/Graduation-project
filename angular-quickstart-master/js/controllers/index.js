/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    var myApp=angular.module('myApp');
    angular.module('myApp').controller('indexController', ['$scope', '$location', 'SweetAlert', '$cookieStore', '$rootScope', '$state',function ($scope, $location, SweetAlert, $cookieStore, $rootScope,$state) {
        declare($scope, $location,$rootScope,$cookieStore,$state);
        init($scope, SweetAlert, $cookieStore, $rootScope,$location);
    }]);
    function declare($scope,$location,$rootScope,$cookieStore,$state) {

        /*导航栏同步切换*/
        $rootScope.currentPage = function (state) {
            angular.forEach($rootScope.module, function (i) {
                i.isCurrentPage = false;
            });
            $rootScope.module[state].isCurrentPage = true;
        };
        $scope.viewController = {
            /*退出*/
            logout:function () {
                window.location='http://localhost:3000';
                $cookieStore.remove("username");
                $cookieStore.remove("password");
                $cookieStore.remove("role");
                $cookieStore.remove("token");
            },
            goPage: function (item) {
                $state.go(item.state);
                /*$location.path(item.state);*/
                $rootScope.currentPage(item.state);
            },
            /*返回顶部*/
            backToTop: function () {
                $('body').animate({
                    scrollTop: 0
                });
            }
        }
    }

    function init($scope, SweetAlert, $cookieStore, $rootScope,$location){
        $rootScope.module = BASIC_DATA.routerConfig;
        $rootScope.role = $cookieStore.get('role');
        if ($cookieStore.get('afterLogin')){
            switch ($rootScope.role){
                case 1:
                    $location.path($rootScope.module.taskUpload.state);
                    break;
                case 2:
                    $location.path($rootScope.module.auditList.state);
                    break;
            }
            $cookieStore.remove('afterLogin');
        }
    }
})();

