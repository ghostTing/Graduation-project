/**
 * Created by Administrator on 2017/5/11.
 */
(function () {
    angular.module('myApp').controller('auditListController', ['$scope', '$http', '$location', '$rootScope', '$state', '$cookieStore', function ($scope, $http, $location, $rootScope, $state, $cookieStore) {
        declare($scope, $location, $state, $cookieStore,$http);
        init($scope, $http, $rootScope);
    }]);
    function declare($scope, $location, $state, $cookieStore,$http) {
        $scope.viewController={
            fetchTask:function () {
                $http.get(BASIC_DATA.API_URL+'/task/check/list').then(function (data) {
                    $scope.taskList=data.data;
                });
            }
        }
    }
    function init($scope, $http, $rootScope) {
        $rootScope.currentPage('auditList');
        $http.get(BASIC_DATA.API_URL+'/task/list',{
        }).then(function (data) {
            $scope.taskList=data.data;
        });
    }
})();