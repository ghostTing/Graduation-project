/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    angular.module('myApp').controller('indexController',['$scope','$location',function ($scope,$location) {
        declare($scope,$location);
        init($scope);
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
        function init($scope) {
            $scope.module=BASIC_DATA.routerConfig;
            $scope.module.taskUpload.isCurrentPage=true;
        }
})();

