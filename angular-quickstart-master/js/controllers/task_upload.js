/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    angular.module('myApp').controller('taskUploadController',['$scope','$http','$location',function ($scope,$http,$location) {
        declare($scope,$location);
        init($scope,$http);
    }]);
    function declare($scope,$location) {
        $scope.goPage=function () {
            $location.path('resourceUpload');
        }
    }
    function init($scope,$http) {
        /*$http.get(BASIC_DATA.API_URL+'/testWeb/',{
            params:{
                id:5
            }
        }).then(function (data) {
            console.log(data);
        })*/
    }
})();
