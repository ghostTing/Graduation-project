/**
 * Created by Administrator on 2017/4/2.
 */
(function () {
    angular.module('myApp').controller('resourceUploadController',['$scope','$http','$location',function ($scope,$http,$location) {
        declare($scope,$location);
        init($scope,$http);
    }]);
    function declare($scope,$location) {

    }
    function init($scope,$http) {
        //配置jQuery文件上传插件
        $('#filer_input').filer({
            showThumbs:true,
            addMore:true
        });
        $scope.nimab='a'
    }
})();

