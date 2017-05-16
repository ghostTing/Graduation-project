/**
 * Created by Administrator on 2017/4/18.
 */
(function () {
    angular.module('myApp').controller('answerProduceController', ['$scope', '$http', '$location', '$sce', '$state', '$stateParams', '$rootScope', '$cookieStore',function ($scope, $http, $location, $sce, $state, $stateParams, $rootScope,$cookieStore) {
        declareModel($scope, $stateParams);
        declare($scope, $sce, $rootScope,$http,$stateParams,$state);
        init($scope,$cookieStore);
    }]);
    function declareModel($scope) {
        $scope.showPlaceholder = true;
        $scope.isEditting=false;
    }

    function declare($scope, $sce, $rootScope,$http,$stateParams,$state) {
        $scope.viewController = {
            initUeditor: function () {
                $scope.isEditting=true;
                $scope.showPlaceholder = false;
                $scope.showSolutionContent = false;
                $scope.ue = UE.getEditor('solution-edit', {
                    elementPathEnabled: false,
                    lang: 'zh-cn',
                    wordCount: false,         //是否开启字数统计
                    fontFamily: [{label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei'}]
                });
                $scope.ue.ready(function () {
                    if ($scope.solution)$scope.ue.setContent($scope.solution);
                })
            },
            saveSolution:function () {
                if (!$scope.isEditting){
                    $http({
                        method:'post',
                        url:BASIC_DATA.API_URL+'/task/addOrUpdatePaperItem/'+$scope.taskId,
                        data:{
                            'parentIndex':$scope.parentIndex,
                            'paperItem':{
                                'childIndex':$scope.childIndex,
                                'examPoint':$scope.examPoint,
                                'answer':$scope.answer
                            }
                        }
                    }).then(function(data){
                        $scope.paper=$scope.viewController.transformToSafeHtml(data.data);
                    });
                    return false
                }
                $scope.pureStrContent=$scope.ue.getContent();
                $scope.solutionSaveAsHtml = $sce.trustAsHtml($scope.pureStrContent);
                $scope.ue.destroy();
                $scope.isEditting=false;
                $scope.showSolutionContent=true;
                $http({
                    method:'post',
                    url:BASIC_DATA.API_URL+'/task/addOrUpdatePaperItem/'+$scope.taskId,
                    data:{
                        'parentIndex':$scope.parentIndex,
                        'paperItem':{
                            'childIndex':$scope.childIndex,
                            'examPoint':$scope.examPoint,
                            'answer':$scope.answer,
                            'solution':$scope.pureStrContent
                        }
                    }
                }).then(function(data){
                    $scope.paper=$scope.viewController.transformToSafeHtml(data.data);
                });
            },
            backToContentProduce: function ($event) {

                if (   $rootScope.previousState_name&& $rootScope.previousState_params ){
                    $rootScope.uselessEvent = $event;
                    $rootScope.back();
                } else{
                    $state.go('contentProduce',{
                        parentIndex:$scope.parentIndex,
                        childIndex: $scope.childIndex,
                        questionIndex : $stateParams.questionIndex
                    });
                }
            },
            /*请求获取paper*/
            getPaper:function(){
                $http.get(BASIC_DATA.API_URL+'/task/editPaper/'+$scope.taskId).then(function (data) {
                    $scope.parentIndex = $stateParams.parentIndex;
                    $scope.childIndex = $stateParams.childIndex;
                    $scope.questionIndex = $stateParams.questionIndex;
                    $scope.pureStrStem=data.data.questionHeadline[$scope.parentIndex].questionList[$scope.childIndex].stem;
                    $scope.solution=data.data.questionHeadline[$scope.parentIndex].questionList[$scope.childIndex].solution
                    $scope.paper=$scope.viewController.transformToSafeHtml(data.data);
                    $scope.examPoint=$scope.paper.questionHeadline[$scope.parentIndex].questionList[$scope.childIndex].examPoint;
                    $scope.answer=$scope.paper.questionHeadline[$scope.parentIndex].questionList[$scope.childIndex].answer;
                    $scope.solutionHtml=$scope.paper.questionHeadline[$scope.parentIndex].questionList[$scope.childIndex].solution;
                    $scope.currentQuestionStem = $scope.paper.questionHeadline[$scope.parentIndex].questionList[$scope.childIndex].stem;
                });
            },
            /*转化为信任的html绑定到页面去*/
            transformToSafeHtml:function (paper) {
                for(var i=0;i<paper.questionHeadline.length;i++){
                    for (var j=0;j<paper.questionHeadline[i].questionList.length;j++){
                        paper.questionHeadline[i].questionList[j].stem=$sce.trustAsHtml( paper.questionHeadline[i].questionList[j].stem);
                        paper.questionHeadline[i].questionList[j].solution=$sce.trustAsHtml( paper.questionHeadline[i].questionList[j].solution);
                    }
                }
                return paper
            }
        }
    }

    function init($scope,$cookieStore) {

        $scope.taskId=$cookieStore.get('taskId');
        /*进入页面 获取paper*/
        $scope.viewController.getPaper();
    }
})();