/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    angular.module('myApp').controller('indexController',['$scope','$location','SweetAlert','$cookieStore',function ($scope,$location,SweetAlert,$cookieStore) {
        declare($scope,$location);
        init($scope,SweetAlert,$cookieStore);
    }]);
        function declare($scope,$location) {
            $scope.viewController={
                goPage:function (item) {
                $location.path(item.state);
                angular.forEach($scope.module,function (i) {
                    i.isCurrentPage=false;
                });
                item.isCurrentPage=true;
            }
            }
        }
        function init($scope,SweetAlert,$cookieStore) {
            $scope.module=BASIC_DATA.routerConfig;
            $scope.module.taskUpload.isCurrentPage=true;
        }
})();

