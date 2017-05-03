/**
 * Created by Administrator on 2017/4/18.
 */
(function () {
    angular.module('myApp').controller('answerProduceController', ['$scope', '$http', '$location', '$sce', '$state', '$stateParams', '$rootScope', function ($scope, $http, $location, $sce, $state, $stateParams, $rootScope) {
        declareModel($scope, $stateParams);
        declare($scope, $sce, $rootScope);
        init($scope, $http, $sce, $stateParams,$rootScope);
    }]);
    function declareModel($scope, $stateParams) {
        $scope.showPlaceholder = true;
    }

    function declare($scope, $sce, $rootScope) {
        $scope.viewController = {
            initUeditor: function () {
                $scope.showPlaceholder = false;
                $scope.ue = UE.getEditor('solution-edit', {
                    elementPathEnabled: false,
                    lang: 'zh-cn',
                    wordCount: false,         //是否开启字数统计
                    fontFamily: [{label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei'}]
                });
            },
            savaSolution:function () {
                $scope.solutionSaveAsHtml= $scope.ue.getContent();
                alert($scope.solutionSaveAsHtml);
            },
            backToContentProduce: function ($event) {
                $rootScope.uselessEvent = $event;
                $rootScope.back();
            }
        }
    }

    function init($scope, $http, $sce, $stateParams,$rootScope) {
        $scope.paper={
            questionHeadline:[{
                questionType: '',
                questionList: [
                    {
                        stem: ''
                    }
                ]
            }
            ]
        };
        $scope.parentIndex = $stateParams.parentIndex;
        $scope.childIndex = $stateParams.childIndex;
        $scope.questionIndex = $stateParams.questionIndex;
        $scope.currentQuestionStem = $scope.paper.questionHeadline[$scope.parentIndex].questionList[$scope.childIndex].stem;

    }
})();