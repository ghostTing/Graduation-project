/**
 * Created by Administrator on 2017/4/4.
 */
/**
 * Created by Administrator on 2017/4/2.
 */
(function () {
    angular.module('myApp').controller('contentProduceController',['$scope','$http','$location','$sce',function ($scope,$http,$location,$sce) {
        declare($scope,$sce);
        init($scope,$http);
    }]);
    function declare($scope,$sce) {
        $scope.viewController={
            showUeditor:function ($event) {
                $event.stopPropagation();
                $scope.isEditing=true;
                $scope.ue.setShow();
            },
            hideUeditor:function () {
                $scope.ue.setHide();
                $scope.isEditing=false;
                $scope.html=$sce.trustAsHtml( $scope.ue.getContent());
                $scope.$apply();
            }
        }
    }
    function init($scope,$http) {
        $('.images').viewer({
            navbar:false,
            rotatable:false
        });
        $scope.ue = UE.getEditor('container',{
            elementPathEnabled : false,
            wordCount:false,         //是否开启字数统计
            fontFamily:[{ label:'',name:'yahei',val:'微软雅黑,Microsoft YaHei'}]
        });
        $scope.ue.ready(function () {
            $scope.ue.setHide();
        });
        document.onclick=function () {
            $scope.viewController.hideUeditor();
        }

    }
})();


