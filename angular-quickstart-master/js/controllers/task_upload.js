/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    angular.module('myApp').controller('taskUploadController',['$scope','$http',function ($scope,$http) {
        declare($scope);
        init($scope,$http);
    }]);
    function declare($scope) {

    }
    function init($scope,$http) {
        //配置jQuery文件上传插件
        $('#filer_input').filer({
            showThumbs:true,
            addMore:true
        });
        $http.get(BASIC_DATA.API_URL+'/testWeb/',{
            params:{
                id:5
            }
        }).then(function (data) {
            console.log(data);
        })
    }
})();
