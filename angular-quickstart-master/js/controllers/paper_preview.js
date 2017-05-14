/**
 * Created by Administrator on 2017/4/25.
 */
(function () {
    angular.module('myApp').controller('paperPreviewController',['$scope','$http','$sce','$rootScope','$state','$cookieStore','$timeout',function ($scope,$http,$sce,$rootScope,$state,$cookieStore,$timeout) {
        declareModel($scope);
        declare($scope,$http,$state,$sce,$cookieStore,$timeout);
        init($scope,$http,$sce,$rootScope,$cookieStore,$state,$timeout);
    }]);
    function declareModel($scope) {
        $scope.BASIC_DATA = window.BASIC_DATA;
    }
    function declare($scope,$http,$state,$sce,$cookieStore,$timeout) {
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
            },
            submitPaper:function () {
                swal({
                        title: "提交试卷",
                        text: "确保所有题目的正确无误？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    },
                    function(){
                        setTimeout(function(){
                            swal("提交成功");
                        }, 2000);
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
            },
            getPaper:function(){
                $http.get(BASIC_DATA.API_URL+'/task/editPaper/'+$scope.taskId).then(function (data) {
                    $scope.paper=$scope.viewController.transformToSafeHtml(data.data);
                });
            },
            finishEditPaper:function () {
                for (var i=0;i<$scope.paper.questionHeadline.length;i++){
                    for (var j=0;j<$scope.paper.questionHeadline[i].questionList.length;j++){
                        if (!$scope.paper.questionHeadline[i].questionList[j].stem||!$scope.paper.questionHeadline[i].questionList[j].examPoint||!$scope.paper.questionHeadline[i].questionList[j].solution||!$scope.paper.questionHeadline[i].questionList[j].answer){
                            swal({
                                title: "提交失败",
                                text: "所有题目的题干和解析必须全部录入完毕",
                                type: "warning",
                                confirmButtonColor: "#DD6B55"
                            });
                            return false
                        }
                    }
                }
                $http({
                    method:'POST',
                    url:BASIC_DATA.API_URL+'/task/finishEditPaper/'+$scope.taskId
                }).then(function (data) {
                    if (data.status==200){
                        swal({
                            title: "提交成功",
                            text: "2秒后返回任务列表",
                            type: "success",
                            confirmButtonColor: "#DD6B55",
                            closeOnConfirm: false,
                            timer: '2000',
                            html: false
                        });
                        $cookieStore.remove('taskId');
                        $timeout(function () {
                            $state.go('taskUpload');
                        },2000);
                    }
                },function () {
                    swal({
                        title: "出错了",
                        text: "请确保所有题目题干和解析都录入完毕，再次提交",
                        type: "error",
                        confirmButtonColor: "#DD6B55"
                    });
                })
            },
            /*获取试卷基础信息*/
            getBasicInfo:function () {
                $http.get(BASIC_DATA.API_URL+'/paper/basicInfo/'+$scope.taskId).then(function (data) {
                    $scope.basicInfo=data.data;
                });
            }
        }
    }
    function init($scope,$http,$sce,$rootScope,$cookieStore,$state,$timeout) {
        $rootScope.currentPage('paperPreview');
        if($cookieStore.get('taskId')){
            $scope.taskId=$cookieStore.get('taskId');
        } else {
            swal({
                title: "操作未授权",
                text: "请上传一个任务或者选择继续制作",
                type: "error",
                confirmButtonColor: "#DD6B55",
                closeOnConfirm: false,
                timer: '2000',
                html: false
            });
            $timeout(function () {
                $state.go('taskUpload')
            },2000)
        }
        /*进入页面 获取paper*/
        $scope.viewController.getPaper();
        $scope.viewController.getBasicInfo();
    }
})();
