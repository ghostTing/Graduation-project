/**
 * Created by Administrator on 2017/4/25.
 */
(function () {
    angular.module('myApp').controller('paperPreviewController',['$scope','$http', function ($scope,$http) {
        declareModel($scope);
        declare($scope,$http);
        init($scope,$http);
    }]);
    function declareModel($scope) {

    }
    function declare($scope,$http) {

    }
    function init($scope,$http) {
        $scope.myTest='i am a good boy'
    }
})();
