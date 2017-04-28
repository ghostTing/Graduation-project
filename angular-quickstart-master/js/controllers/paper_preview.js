/**
 * Created by Administrator on 2017/4/25.
 */
(function () {
    angular.module('myApp').controller('paperPreviewController',['$scope','$http','$sce','$rootScope','$state', function ($scope,$http,$sce,$rootScope,$state) {
        declareModel($scope);
        declare($scope,$http,$state);
        init($scope,$http,$sce);
    }]);
    function declareModel($scope) {
        $scope.BASIC_DATA = window.BASIC_DATA;
    }
    function declare($scope,$http,$state) {
        $scope.viewController={
            /*计算题序*/
            questionIndexCom: function ($parent, $index) {
                var tempLength = 0, i;
                /*返回题干录入做特殊处理*/
                if (typeof $parent == 'number') {
                    for (i = 0; i < $parent; i++) {
                        tempLength += $scope.paper.questionHeadline[i].questionList.length;
                    }
                } else {
                    for (i = 0; i < $parent.$index; i++) {
                        tempLength += $scope.paper.questionHeadline[i].questionList.length;
                    }
                }
                $scope.questionIndex = tempLength + $index;
                return $scope.questionIndex;
            },
            /*返回题干制作*/
            backToContentProduce: function () {
               $state.go(BASIC_DATA.routerConfig.contentProduce.state);
            }
        }
    }
    function init($scope,$http,$sce) {

    }
})();
