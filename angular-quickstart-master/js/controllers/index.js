/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    angular.module('myApp').controller('indexController',['$scope','$location','SweetAlert',function ($scope,$location,SweetAlert) {
        declare($scope,$location);
        init($scope,SweetAlert);
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
        function init($scope,SweetAlert) {
            $scope.module=BASIC_DATA.routerConfig;
            $scope.module.taskUpload.isCurrentPage=true;
        }
})();

