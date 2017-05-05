/**
 * Created by Administrator on 2017/5/6.
 */
angular.module('myApp').controller('TEST_CONTROLLER',['$scope','$http',function ($scope,$http) {
    $http.get(BASIC_DATA.API_URL+'/task/list',{'name':'111111'}).then(function (data) {
        console.log(data.data);
    });
    $http({
        method:'post',
        url:BASIC_DATA.API_URL+'/task/startMaking',
        data:{
            'asdasdasd':'asdsad'
        }
    }).then(function(data){
        $scope.test=data.data;
    })
}]);