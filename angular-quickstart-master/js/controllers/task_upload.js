/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    angular.module('myApp').controller('taskUploadController',['$scope','$http','$location','$rootScope',function ($scope,$http,$location,$rootScope) {
        declare($scope,$location);
        init($scope,$http,$rootScope);
    }]);
    function declare($scope,$location) {
        $scope.goPage=function () {
            $location.path('resourceUpload');
        }
    }
    function init($scope,$http,$rootScope) {
        $rootScope.currentPage('taskUpload');
        $scope.TASK_STATUS=BASIC_DATA.TASK_STATUS;
        $http.get(BASIC_DATA.API_URL+'/task/list',{
        }).then(function (data) {
            $scope.taskList=data.data;
        });
    }
})();
