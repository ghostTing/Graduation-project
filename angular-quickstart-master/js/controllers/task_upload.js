/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    angular.module('myApp').controller('taskUploadController',['$scope','$http','$rootScope','$state','$cookieStore',function ($scope,$http,$rootScope,$state,$cookieStore) {
        declare($scope,$state,$cookieStore,$http);
        init($scope,$http,$rootScope);
    }]);
    function declare($scope,$state,$cookieStore,$http) {
        $scope.goPage=function () {
           /* $location.path('resourceUpload');*/
           $state.go('resourceUpload');
        };
        $scope.goContentProduce=function (task) {
            $cookieStore.put('taskId',task.taskId);
            $cookieStore.put('taskStatus',task.status);

            $state.go('contentProduce');
        };
        $scope.getTaskList=function () {
            $http.get(BASIC_DATA.API_URL+'/task/list',{}).then(function (data) {
                $scope.taskList=data.data;
            });
        }
    }
    function init($scope,$http,$rootScope) {
        $rootScope.currentPage('taskUpload');
        $scope.TASK_STATUS=BASIC_DATA.TASK_STATUS;
        $scope.getTaskList();
    }
})();
