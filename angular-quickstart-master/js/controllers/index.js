/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    angular.module('myApp').controller('indexController',['$scope','$location','SweetAlert','$cookieStore','$rootScope',function ($scope,$location,SweetAlert,$cookieStore,$rootScope) {
        declare($scope,$location,$rootScope);
        init($scope,SweetAlert,$cookieStore,$rootScope);
    }]);
        function declare($scope,$location,$rootScope) {
            /*导航栏同步切换*/
            $rootScope.currentPage=function (state) {
                angular.forEach($rootScope.module,function (i) {
                    i.isCurrentPage=false;
                });
                $rootScope.module[state].isCurrentPage=true;
            };
            $scope.viewController={
                goPage:function (item) {
                    $location.path(item.state);
                    $rootScope.currentPage(item.state);
                },
                /*返回顶部*/
                backToTop:function () {
                    $('body').animate({
                        scrollTop: 0
                    });
                }
            }
        }
        function init($scope,SweetAlert,$cookieStore,$rootScope) {
            $rootScope.module=BASIC_DATA.routerConfig;
            $rootScope.currentPage('taskUpload');
        }
})();

