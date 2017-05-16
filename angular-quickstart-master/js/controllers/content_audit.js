/**
 * Created by Administrator on 2017/4/29.
 */
(function(){
    angular.module('myApp').controller('contentAuditController',['$scope','$http','$sce','$rootScope','$location','$timeout','$cookieStore','$state',function($scope,$http,$sce,$rootScope,$location,$timeout,$cookieStore,$state){
        declareModel($scope);
        declare($scope, $sce,$http,$state,$cookieStore);
        init($scope, $http, $sce,$rootScope,$location,$timeout,$cookieStore );
    }]);
    function declareModel($scope) {
        $scope.flag=true;
       $scope.BASIC_DATA=window.BASIC_DATA;
    }
    function declare($scope,$sce,$http,$state,$cookieStore) {
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
            submitErrMsg:function () {
                swal({
                        title: "批注提交",
                        text: "提交前确保所有题目的错误批注填写完毕",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    },
                    function(){
                        if ($scope.errMsg){
                            $http({
                                method:'POST',
                                url:BASIC_DATA.API_URL+'/task/check/saveErrorMsg/'+$scope.taskId,
                                params:{
                                    errorMsg:encodeURI($scope.errMsg)
                                }
                            }).then(function (data) {
                                if (data.status==200){
                                    setTimeout(function(){
                                        swal("提交成功");
                                        $state.go('auditList');
                                    }, 1000);
                                }
                            },function (data) {
                                swal({
                                    type:'error',
                                    text:data.message,
                                    title:'发生错误'
                                });
                            });
                        }
                    });
               /* swal({
                        title: "确认提交?",
                        text: "请确保所有题目的错误批注填写完毕",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            setTimeout(function(){
                                swal("Ajax request finished!");
                            }, 2000);
                        } else {
                            swal("取消成功", "您填写的批注仍旧保存", "error");
                        }
                    });*/
            },
            passAudit:function () {
                swal({
                        title: "审核通过",
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
                        $http({
                            method:'POST',
                            url:BASIC_DATA.API_URL+'/task/check/store/'+$scope.taskId,
                        }).then(function () {
                            setTimeout(function(){
                                $cookieStore.remove('taskId');
                                $cookieStore.remove('taskStatus');
                                $state.go('auditList');
                                swal("提交成功");
                            }, 1000);
                        });
                    });
            },
            /*移动图片*/
            moveTo:function (derection) {
                var ulNode,getUlMLval,imgLength;
                /*设置点击事件响应的时间间隔*/
                if (!$scope.flag){
                    return false;
                }
                setTimeout(function(){
                    $scope.flag=true;
                },500);
                ulNode=document.getElementsByClassName('images')[0];
                if (ulNode.currentStyle){
                    getUlMLval=ulNode.currentStyle('marginLeft');
                }else {
                    getUlMLval=parseInt(getComputedStyle(ulNode).marginLeft);
                }
                imgLength=ulNode.getElementsByTagName('li').length;
                if (derection=='l'){
                    if(getUlMLval<=(imgLength-4)*(-160)){
                        return false
                    }
                    ulNode.style.marginLeft=getUlMLval-160+'px';
                }else {
                    if(getUlMLval>=0){
                        return false
                    }
                    ulNode.style.marginLeft=getUlMLval+160+'px';
                }
                $scope.flag=false;
            },
            /*获取基础信息*/
            getBasicInfo:function () {
                $http.get(BASIC_DATA.API_URL+'/paper/basicInfo/'+$scope.taskId).then(function (data) {
                    $scope.basicInfo=data.data;
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
            /*获取试卷*/
            getPaper:function () {
                $http.get(BASIC_DATA.API_URL+'/task/editPaper/'+$scope.taskId).then(function (data) {
                    $scope.paper=$scope.viewController.transformToSafeHtml(data.data);
                });
            }
        }
    }
    function init($scope, $http, $sce,$rootScope,$location,$timeout,$cookieStore){
        if ($rootScope.role!=2||!$cookieStore.get('taskId')){
            swal({
                type:'error',
                text:'操作未授权',
                timer:'1000',
                title:'发生错误'
            });
            $timeout(function () {
                $location.path(BASIC_DATA.routerConfig.auditList.state);
            },1000)
        }
        $rootScope.currentPage('contentAudit');
        $scope.taskId=$cookieStore.get('taskId');
        $scope.viewController.getBasicInfo();
        $scope.viewController.getPaper();
        $('.images').viewer({
            navbar: false,
            rotatable: false,
            zoomRatio:0.2
        });
    }
})();