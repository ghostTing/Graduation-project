/**
 * Created by Administrator on 2017/3/27.
 */
(function () {
    angular.module('myApp').controller('taskUploadController',['$scope',function ($scope) {
        declare($scope);
        init($scope);
    }]);
    function declare($scope) {

    }
    function init($scope) {
        //配置jQuery文件上传插件
        $('#filer_input').filer({
            showThumbs:true,
            addMore:true
        });
    }
})();
