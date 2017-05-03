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
        /*$http.get(BASIC_DATA.API_URL+'/testWeb/',{
            params:{
                id:5
            }
        }).then(function (data) {
            console.log(data);
        })*/
    }
})();
