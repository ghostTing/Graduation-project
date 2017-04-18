/**
 * Created by Administrator on 2017/4/18.
 */
(function () {
    angular.module('myApp').controller('answerProduceController',['$scope','$http','$location','$sce','$state','$stateParams',function ($scope,$http,$location,$sce,$state,$stateParams){
        declareModel($scope);
        declare($scope,$sce);
        init($scope,$http,$sce,$stateParams);
    }]);
    function declareModel($scope) {

    }
    function declare($scope,$sce) {

    }
    function init($scope,$http,$sce,$stateParams) {
        console.log($stateParams.args);
    }
})();