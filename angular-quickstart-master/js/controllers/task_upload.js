/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    angular.module('myApp').controller('taskUploadController',['$scope','$http','$location','$rootScope','$state','$cookieStore',function ($scope,$http,$location,$rootScope,$state,$cookieStore) {
        declare($scope,$location,$state,$cookieStore);
        init($scope,$http,$rootScope);
    }]);
    function declare($scope,$location,$state,$cookieStore) {
        $scope.goPage=function () {
           /* $location.path('resourceUpload');*/
           $state.go('resourceUpload');
        };
        $scope.goContentProduce=function (taskId) {
            $cookieStore.put('taskId',taskId);
            $state.go('contentProduce');
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
